// import React, { useState } from 'react';
// import ECGChart from './components/ECGChart';
// import StatCards from './components/StatCards';
// import { Container, Typography } from '@mui/material';

// function App() {
//   const [hr, setHR] = useState(0);
//   const [ai, setAI] = useState('Normal');
//   const [confidence, setConfidence] = useState('0%');

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" align="center" mt={4}>
//         Real-time ECG Monitor
//       </Typography>
//       <StatCards hr={hr} ai={ai} confidence={confidence} />
//       <ECGChart setHR={setHR} setAI={setAI} setConfidence={setConfidence} />
//     </Container>
//   );
// }

// export default App;


// import React from 'react';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return <Dashboard />;
// }

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VitalSignsPage from './pages/VitalSignsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vitals" element={<VitalSignsPage />} />
    </Routes>
  );
}

export default App;
