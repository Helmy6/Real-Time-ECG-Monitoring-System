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

// Change here
const WINDOW_SIZE = 250;        // Show 250 samples per chart
const UPDATE_INTERVAL = 250;    // Update every 250 new samples

export default function ECGChart({ setHR, setAI, setConfidence }) {
  const [data, setData] = useState([]);
  const [rPeaks, setRPeaks] = useState([]);
  const socketRef = useRef(null);

  const prevHR = useRef(null);
  const prevAI = useRef(null);
  const prevConfidence = useRef(null);
  const sampleCounter = useRef(0);
  const batchBuffer = useRef([]);

  useEffect(() => {
    socketRef.current = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL);

    socketRef.current.onopen = () => console.log('WebSocket connected!');
    socketRef.current.onerror = (err) => console.error('WebSocket error:', err);
    socketRef.current.onclose = (event) => console.log('WebSocket closed:', event);

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (
          !message ||
          !Array.isArray(message.ECG) ||
          message.HR === undefined ||
          message.AI === undefined ||
          message.Confidence === undefined
        ) {
          console.warn('Unrecognized message format:', event.data);
          return;
        }

        const filteredSignal = message.ECG;
        const hrValue = parseInt(message.HR);
        const aiValue = message.AI.trim();
        const confidenceValue = parseFloat(message.Confidence);

        filteredSignal.forEach((ecgValue) => {
          batchBuffer.current.push({
            sample: sampleCounter.current++,
            ecg: ecgValue,
          });

          if (batchBuffer.current.length === UPDATE_INTERVAL) {
            const latestChunk = [...batchBuffer.current];
            batchBuffer.current = [];
            setData(latestChunk);
          }
        });

        setRPeaks([]); // Optional: highlight peaks

        if (prevHR.current === null || Math.abs(hrValue - prevHR.current) > 3) {
          setHR(hrValue);
          prevHR.current = hrValue;
        }

        if (prevConfidence.current === null || Math.abs(confidenceValue - prevConfidence.current) > 5) {
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

  const ecgValues = data.map((d) => d.ecg);
  const mean = ecgValues.reduce((sum, val) => sum + val, 0) / (ecgValues.length || 1);
  const maxDeviation = Math.max(...ecgValues.map((val) => Math.abs(val - mean)), 0.5);
  const yMin = mean - maxDeviation - 0.1;
  const yMax = mean + maxDeviation + 0.1;

  const minSample = data.length > 0 ? data[0].sample : 0;
  const maxSample = minSample + WINDOW_SIZE;

  const ticks = [];
  for (let i = minSample; i <= maxSample; i += 50) {
    ticks.push(i);
  }

  return (
    <Card sx={{ marginTop: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
      <CardContent>
        <Typography variant="h6" style={{ color: '#00FF00' }}>
          Real-time ECG Signal (250-sample Window)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#333" />
            <XAxis
              dataKey="sample"
              type="number"
              domain={[minSample, maxSample]}
              ticks={ticks}
              stroke="#aaa"
              label={{
                value: 'Samples',
                position: 'insideBottomRight',
                offset: -5,
                fill: '#aaa',
              }}
            />
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
                if (name === 'sample') return [value + ' samples', 'Sample'];
                return [value.toFixed(3) + ' mV', 'ECG'];
              }}
              labelFormatter={(value) => `Sample: ${value}`}
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
