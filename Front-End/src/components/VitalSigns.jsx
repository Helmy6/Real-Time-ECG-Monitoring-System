import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import CountUp from 'react-countup';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpacityIcon from '@mui/icons-material/Opacity';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VitalTrends from './VitalTrends';

const patients = {
  'Patient A': {
    temp: 36.7, bp: { sys: 120, dia: 80 }, spo2: 98, hr: 76
  },
  'Patient B': {
    temp: 38.1, bp: { sys: 140, dia: 90 }, spo2: 95, hr: 92
  },
  'Patient C': {
    temp: 35.9, bp: { sys: 110, dia: 70 }, spo2: 99, hr: 68
  },
};

export default function VitalSigns() {
  const [selected, setSelected] = useState('Patient A');
  const vitals = patients[selected];

  const cards = [
    {
      label: 'Temperature',
      value: vitals.temp,
      unit: '°C',
      icon: <LocalFireDepartmentIcon color="error" />
    },
    {
      label: 'Blood Pressure',
      value: vitals.bp.sys,
      unit: `/${vitals.bp.dia} mmHg`,
      icon: <OpacityIcon color="primary" />
    },
    {
      label: 'SpO₂',
      value: vitals.spo2,
      unit: '%',
      icon: <MonitorHeartIcon color="success" />
    },
    {
      label: 'Heart Rate',
      value: vitals.hr,
      unit: ' BPM',
      icon: <FavoriteIcon color="error" />
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Patient</InputLabel>
        <Select
          value={selected}
          label="Patient"
          onChange={(e) => setSelected(e.target.value)}
        >
          {Object.keys(patients).map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {cards.map((v, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
                backgroundColor: '#ffffffcc',
                backdropFilter: 'blur(5px)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {v.icon} {v.label}
                </Typography>
                <Typography variant="h4" color="primary">
                  <CountUp
                    end={v.value}
                    duration={1.2}
                    decimals={v.unit.includes('.') ? 1 : 0}
                  />
                  {v.unit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <VitalTrends vitals={vitals} />
    </Box>
  );
}
