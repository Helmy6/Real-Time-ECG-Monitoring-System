// import React, { useEffect, useState, useRef } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Scatter,
// } from 'recharts';
// import { Card, CardContent, Typography } from '@mui/material';

// const MAX_DATA_POINTS = 1250;
// const SAMPLING_RATE_HZ = 250;

// export default function ECGChart({ setHR, setAI, setConfidence }) {
//   const [data, setData] = useState([]);
//   const [rPeaks, setRPeaks] = useState([]);
//   const socketRef = useRef(null);

//   const prevHR = useRef(null);
//   const prevAI = useRef(null);
//   const prevConfidence = useRef(null);
//   const pointCounter = useRef(0);

//   useEffect(() => {
//     socketRef.current = new WebSocket('ws://192.168.12.160:8100');

//     socketRef.current.onopen = () => console.log('WebSocket connected!');
//     socketRef.current.onerror = (err) => console.error('WebSocket error:', err);
//     socketRef.current.onclose = (event) => console.log('WebSocket closed:', event);

//     socketRef.current.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);

//         // Skip invalid or lead-off lines
//         if (
//           !message ||
//           message.ECG === undefined ||
//           message.HR === undefined ||
//           message.AI === undefined ||
//           message.Confidence === undefined
//         ) {
//           if (typeof event.data === 'string' && event.data.includes('Lead off detected')) {
//             console.warn('Lead off detected! Skipping data...');
//           } else {
//             console.warn('Unrecognized ECG line:', event.data);
//           }
//           return;
//         }

//         const ecgValue = parseFloat(message.ECG);
//         const hrValue = parseInt(message.HR);
//         const aiValue = message.AI.trim();
//         const confidenceValue = parseInt(message.Confidence);

//         const timeInSeconds = pointCounter.current / SAMPLING_RATE_HZ;
//         pointCounter.current += 1;

//         // Add new point and keep only the last MAX_DATA_POINTS
//         setData((prevData) => {
//           const newData = [...prevData, { time: timeInSeconds, ecg: ecgValue }];
//           return newData.slice(-MAX_DATA_POINTS);
//         });

//         // No rPeaks parsing from this data, clear
//         setRPeaks([]);

//         // Send HR if changed significantly
//         if (prevHR.current === null || Math.abs(hrValue - prevHR.current) > 3) {
//           setHR(hrValue);
//           prevHR.current = hrValue;
//         }

//         // Update confidence
//         if (
//           prevConfidence.current === null ||
//           Math.abs(confidenceValue - prevConfidence.current) > 5
//         ) {
//           setConfidence(confidenceValue);
//           prevConfidence.current = confidenceValue;
//         }

//         // Update AI message
//         if (prevAI.current !== aiValue) {
//           setAI(aiValue);
//           prevAI.current = aiValue;
//         }
//       } catch (err) {
//         console.error('Error parsing WebSocket message:', err);
//       }
//     };

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [setHR, setAI, setConfidence]);

//   const yMin = Math.min(...data.map((d) => d.ecg), -1);
//   const yMax = Math.max(...data.map((d) => d.ecg), 1);

//   return (
//     <Card sx={{ marginTop: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//       <CardContent>
//         <Typography variant="h6" style={{ color: '#00FF00' }}>
//           Real-time ECG Signal
//         </Typography>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data}>
//             <CartesianGrid stroke="#333" />
//             <XAxis
//               dataKey="time"
//               type="number"
//               domain={['auto', 'auto']}
//               tickFormatter={(time) => time.toFixed(2) + 's'}
//               stroke="#aaa"
//               label={{
//                 value: 'Time (s)',
//                 position: 'insideBottomRight',
//                 offset: -5,
//                 fill: '#aaa',
//               }}
//             />
//             <YAxis
//               domain={[yMin - 0.1, yMax + 0.1]}
//               stroke="#aaa"
//               label={{
//                 value: 'ECG (mV)',
//                 angle: -90,
//                 position: 'insideLeft',
//                 fill: '#aaa',
//               }}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: '#222',
//                 border: '1px solid #00FF00',
//                 color: '#00FF00',
//               }}
//               formatter={(value, name) => {
//                 if (name === 'time') return [value.toFixed(3) + ' s', 'Time'];
//                 return [value.toFixed(3) + ' V', 'ECG'];
//               }}
//               labelFormatter={(value) => `Time: ${value.toFixed(3)} s`}
//             />
//             <Line type="monotone" dataKey="ecg" stroke="#ff7300" dot={false} isAnimationActive={false} />
//             <Scatter data={rPeaks} fill="#00FF00" />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Scatter,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const MAX_DATA_POINTS = 1250;
const SAMPLING_RATE_HZ = 250;

export default function ECGChart({ setHR, setAI, setConfidence }) {
  const [data, setData] = useState([]);
  const [rPeaks, setRPeaks] = useState([]);
  const socketRef = useRef(null);

  const prevHR = useRef(null);
  const prevAI = useRef(null);
  const prevConfidence = useRef(null);
  const pointCounter = useRef(0);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://192.168.12.160:8100');

    socketRef.current.onopen = () => console.log('WebSocket connected!');
    socketRef.current.onerror = (err) => console.error('WebSocket error:', err);
    socketRef.current.onclose = (event) => console.log('WebSocket closed:', event);

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (
          !message ||
          message.ECG === undefined ||
          message.HR === undefined ||
          message.AI === undefined ||
          message.Confidence === undefined
        ) {
          if (typeof event.data === 'string' && event.data.includes('Lead off detected')) {
            console.warn('Lead off detected! Skipping data...');
          } else {
            console.warn('Unrecognized ECG line:', event.data);
          }
          return;
        }

        const ecgValue = parseFloat(message.ECG);
        const hrValue = parseInt(message.HR);
        const aiValue = message.AI.trim();
        const confidenceValue = parseInt(message.Confidence);

        const timeInSeconds = pointCounter.current / SAMPLING_RATE_HZ;
        pointCounter.current += 1;

        setData((prevData) => {
          const newData = [...prevData, { time: timeInSeconds, ecg: ecgValue }];
          return newData.slice(-MAX_DATA_POINTS);
        });

        setRPeaks([]);

        if (prevHR.current === null || Math.abs(hrValue - prevHR.current) > 3) {
          setHR(hrValue);
          prevHR.current = hrValue;
        }

        if (
          prevConfidence.current === null ||
          Math.abs(confidenceValue - prevConfidence.current) > 5
        ) {
          setConfidence(confidenceValue);
          prevConfidence.current = confidenceValue;
        }

        if (prevAI.current !== aiValue) {
          setAI(aiValue);
          prevAI.current = aiValue;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [setHR, setAI, setConfidence]);

  // Adjust the Y axis to center the signal.
  const ecgValues = data.map((d) => d.ecg);
  const mean = ecgValues.reduce((sum, val) => sum + val, 0) / (ecgValues.length || 1);
  const maxDeviation = Math.max(...ecgValues.map((val) => Math.abs(val - mean)), 0.5);
  const yMin = mean - maxDeviation - 0.1;
  const yMax = mean + maxDeviation + 0.1;

  return (
    <Card sx={{ marginTop: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
      <CardContent>
        <Typography variant="h6" style={{ color: '#00FF00' }}>
          Real-time ECG Signal
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#333" />
            <XAxis
              dataKey="time"
              type="number"
              domain={['auto', 'auto']}
              tickFormatter={(time) => time.toFixed(2) + 's'}
              stroke="#aaa"
              label={{
                value: 'Time (s)',
                position: 'insideBottomRight',
                offset: -5,
                fill: '#aaa',
              }}
            />
            {/* <YAxis
              domain={[yMin, yMax]}
              stroke="#aaa"
              label={{
                value: 'ECG (mV)',
                angle: -90,
                position: 'insideLeft',
                fill: '#aaa',
              }}
            /> */}
            <YAxis
              domain={[yMin, yMax]}
              stroke="#aaa"
              label={{
                value: 'ECG (mV)',
                angle: -90,
                position: 'insideLeft',
                fill: '#aaa',
              }}
              tickFormatter={(value) => value.toFixed(2)}  
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#222',
                border: '1px solid #00FF00',
                color: '#00FF00',
              }}
              formatter={(value, name) => {
                if (name === 'time') return [value.toFixed(3) + ' s', 'Time'];
                return [value.toFixed(3) + 'mV', 'ECG'];
              }}
              labelFormatter={(value) => `Time: ${value.toFixed(3)} s`}
            />
            <Line
              type="monotone"
              dataKey="ecg"
              stroke="#ff7300"
              dot={false}
              isAnimationActive={false}
            />
            <Scatter data={rPeaks} fill="#00FF00" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}