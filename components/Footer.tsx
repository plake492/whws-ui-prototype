import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#333333', color: 'background.default', p: 4 }} component="footer">
      <Typography variant="body2">© 2025 WHWS Inspired UI Demo</Typography>
    </Box>
  );
}
