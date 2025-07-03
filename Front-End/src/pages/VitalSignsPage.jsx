import React from 'react';
import { Container, Typography } from '@mui/material';
import VitalSigns from '../components/VitalSigns';

export default function VitalSignsPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vital Signs Monitor
      </Typography>
      <VitalSigns />
    </Container>
  );
}
