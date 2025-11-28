'use client';

import { useState, useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';

const loading = () => {
  return <Box sx={{ minHeight: '100dvh', display: 'grid', placeContent: 'center', minWidth: '100vw' }}>Join</Box>;
};

export default loading;
