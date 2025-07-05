import React, { useState } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCards from '../components/StatCards';
import ECGChart from '../components/ECGChart';
import AlertBox from '../components/AlertBox';
import './Dashboard.css';

export default function Dashboard() {
  const [hr, setHR] = useState(0);
  const [ai, setAI] = useState('Normal');
  const [confidence, setConfidence] = useState('0%');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <StatCards hr={hr} ai={ai} confidence={confidence} />
          <AlertBox ai={ai} />
          <ECGChart setHR={setHR} setAI={setAI} setConfidence={setConfidence} />
        </Container>
      </Box>
    </Box>
  );
}

