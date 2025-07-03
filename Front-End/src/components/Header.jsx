import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import './Header.css';

export default function Header({ handleDrawerToggle }) {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar position="fixed" color="primary" className="header-bar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <MonitorHeartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" noWrap>
          ECG Monitor Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
