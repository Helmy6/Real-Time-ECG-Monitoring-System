import React from 'react';
import { Alert } from '@mui/material';

export default function AlertBox({ ai }) {
  if (ai === 'Normal') return null;

  const isLeadOff = ai.toLowerCase().includes('lead');

  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {isLeadOff ? '⚠️ Lead off detected!' : `⚠️ Abnormal reading: ${ai}`}
    </Alert>
  );
}
