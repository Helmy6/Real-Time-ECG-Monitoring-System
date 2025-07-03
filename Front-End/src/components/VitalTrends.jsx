import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

export default function VitalTrends({ vitals }) {
  // Generate mock data based on current vitals
  const mockData = Array.from({ length: 20 }).map((_, i) => ({
    time: `-${20 - i}s`,
    temp: (vitals.temp + (Math.random() - 0.5) * 0.5).toFixed(1),
    spo2: Math.min(100, Math.max(90, vitals.spo2 + (Math.random() - 0.5) * 2)),
    hr: Math.round(vitals.hr + (Math.random() - 0.5) * 6),
  }));

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vital Sign Trends (Last 20s)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#e53935" name="Temp (°C)" />
            <Line type="monotone" dataKey="spo2" stroke="#1e88e5" name="SpO₂ (%)" />
            <Line type="monotone" dataKey="hr" stroke="#43a047" name="HR (BPM)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
