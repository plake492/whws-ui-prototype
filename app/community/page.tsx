import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Header from '@/components/Header';

export default function Component() {
  return (
    <Box className="animated-gradient">
      <Header />
      <Stack sx={{ display: 'grid', placeContent: 'center', minHeight: '100dvh' }}>
        <Typography variant="h1">Community</Typography>
      </Stack>
    </Box>
  );
}
