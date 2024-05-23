'use client';
import React from 'react';
import { Grid, Paper } from '@mui/material';
 
const PaperContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item xs={12} sm={2}>
      <Paper
        component="form"
        sx={{ p: '8px 4px', display: 'flex', alignItems: 'center', marginTop: 2, marginLeft: 2 }}
      >
        {children}
      </Paper>
    </Grid>
  )
} 

export default PaperContent