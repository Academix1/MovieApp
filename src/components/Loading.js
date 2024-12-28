import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

export default Loading;
