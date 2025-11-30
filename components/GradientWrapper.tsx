'use client';

import React from 'react';
import { Box } from '@mui/material';

const GradientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        p: 4,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        flex: 1,
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};

export default GradientWrapper;
