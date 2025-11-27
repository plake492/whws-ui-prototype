'use client';

import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

export const HeroGrid = styled(Box)(({ theme }) => ({
  maxWidth: 1600,
  margin: '0 auto',
  padding: '80px 60px',
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: 80,
  alignItems: 'center',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
    padding: '40px 20px',
    gap: 40,
  },
}));

interface DecorativeCircleProps {
  size: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  opacity?: number;
}

export const DecorativeCircle: React.FC<DecorativeCircleProps> = ({
  size,
  top,
  right,
  bottom,
  left,
  opacity = 0.1,
}) => (
  <Box
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `rgba(255, 255, 255, ${opacity})`,
      top,
      right,
      bottom,
      left,
    }}
  />
);

export const StatsCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 50,
  borderRadius: 40,
  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  position: 'relative',
}));

export const StatItem = styled(Box)({
  marginBottom: 35,
  '&:last-child': {
    marginBottom: 0,
  },
});

export const CommunitiesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 40,
  maxWidth: 1600,
  margin: '0 auto',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
  },
}));

export const CommunityCard = styled(Box)<{ offset?: boolean }>(({ theme, offset }) => ({
  background: theme.palette.background.default,
  padding: 60,
  borderRadius: 50,
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transform: offset ? 'translateY(60px)' : 'translateY(0)',
  '&:hover': {
    transform: offset ? 'translateY(50px)' : 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
  },
  '@media (max-width:768px)': {
    padding: 40,
    transform: 'translateY(0)',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
}));

export const SplitSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
  },
  backgroundColor: theme.palette.background.default,
}));

export const ChatDemo = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 40,
  borderRadius: 40,
  width: '100%',
  maxWidth: 600,
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
}));
