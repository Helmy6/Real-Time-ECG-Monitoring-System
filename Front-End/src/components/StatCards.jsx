import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import './StatCards.css';

export default function StatCards({ hr, ai, confidence }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: { xs: '100%', sm: '900px' },
          px: 2
        }}
        className="stat-cards"
      >
        <Grid item xs={12} sm={4}>
          <Card className="card heart-rate">
            <CardContent>
              <Typography variant="h6">Heart Rate</Typography>
              <Typography variant="h4" color="primary">{hr} BPM</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className="card ai-status">
            <CardContent>
              <Typography variant="h6">AI Diagnosis</Typography>
              <Typography variant="h5">{ai}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className="card confidence-level">
            <CardContent>
              <Typography variant="h6">Confidence</Typography>
              <Typography variant="h5">{confidence}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
