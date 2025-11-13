'use client';

import { ReactElement } from 'react';

import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Box, Stack, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { Pallet } from '@mui/icons-material';

interface DataProp {
  icon: 'chat' | 'community' | 'health';
  text: string;
}

const TextAndIcon = ({ Icon }: { Icon: ReactElement }) => {
  return (
    <Stack
      alignItems={'center'}
      sx={({ palette }) => ({
        backgroundColor: palette.primary.light,
        width: '100px',
        height: '100px',
        p: 4,
        borderRadius: '50%',
        position: 'relative',
      })}
    >
      <Box sx={{ width: '40px', height: '40px', display: 'grid', placeContent: 'center' }}>{Icon}</Box>
    </Stack>
  );
};

// Define fade in animation (faster than movement)
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// Text fade in animation
const textFadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export default function CicleIcon({
  data,
}: {
  data: {
    icon: 'chat' | 'community' | 'health';
    text: string;
  }[];
}) {
  const iconMap = {
    chat: (
      <ForumIcon
        fontSize="large"
        sx={({ palette }) => ({
          fontSize: '60px',
          color: palette.accent.pink,
        })}
      />
    ),
    community: (
      <PeopleIcon
        fontSize="large"
        sx={({ palette }) => ({
          fontSize: '60px',
          color: palette.accent.purple,
        })}
      />
    ),
    health: (
      <HealthAndSafetyIcon
        fontSize="large"
        sx={({ palette }) => ({
          fontSize: '60px',
          color: palette.accent.yellow,
        })}
      />
    ),
  };

  // Calculate positions on circle circumference
  const circleRadius = 200; // Half of the 400px width/height

  // Custom angles for top-left, top-right, bottom-center
  const customAngles = [
    (5 * Math.PI) / 4 - 0.15, // Top-left (225 degrees + ~9 degrees lower)
    (7 * Math.PI) / 4 + 0.15, // Top-right (315 degrees + ~9 degrees lower)
    Math.PI / 2, // Bottom-center (90 degrees)
  ];

  // Starting position (center of circle)
  const startPosition = { x: 0, y: 0 };

  // Function to generate keyframes for each icon
  const generatePathKeyframes = (finalAngle: number) => {
    // Calculate how many steps we need for a smooth animation
    const steps = 20;
    let keyframeString = '';

    for (let step = 0; step <= steps; step++) {
      const progress = step / steps;
      // Start from center (0, 0) and move outward to final position
      const currentRadius = circleRadius * progress;
      const x = currentRadius * Math.cos(finalAngle);
      const y = currentRadius * Math.sin(finalAngle);
      const percentage = (progress * 100).toFixed(2);

      keyframeString += `${percentage}% { transform: translate(${x}px, ${y}px) translate(-50%, -50%); }\n`;
    }

    return keyframes`${keyframeString}`;
  };

  // Generate keyframes for each icon path
  const pathAnimations = customAngles.map((angle) => generatePathKeyframes(angle));

  // Animation delays for staggered start (in seconds)
  const iconDelays = [0, 0.15, 0.3]; // Stagger icon animations by 0.15s

  // Text positions relative to icons
  // top-left: above and to the left, top-right: above and to the right, bottom: below
  const textPositions = [
    { top: '-54px', left: '-60px', textAlign: 'left' as const }, // top-left icon
    { top: '-54px', right: '-60px', textAlign: 'right' as const }, // top-right icon
    { bottom: '-54px', left: '50%', transform: 'translateX(-50%) !important', textAlign: 'center' as const }, // bottom-center icon
  ];

  // Text animation delays: start after circle animation (1.5s + icon delay), then stagger by 0.2s
  const textDelays = [1.5, 1.65 + 0.15, 1.8 + 0.3]; // Account for icon stagger delays

  return (
    <Box
      sx={({ palette }) => ({
        height: '400px',
        width: '400px',
        borderRadius: '50%',
        border: `10px solid ${palette.primary.light}`,
        position: 'relative',
        opacity: 0,
        animation: `${fadeIn} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
      })}
    >
      {data.map(({ icon, text }, i) => {
        const finalAngle = customAngles[i];
        const finalX = circleRadius * Math.cos(finalAngle);
        const finalY = circleRadius * Math.sin(finalAngle);

        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(${finalX}px, ${finalY}px) translate(-50%, -50%)`,
              animation: `${pathAnimations[i]} 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, ${fadeIn} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${iconDelays[i]}s`,
              opacity: 0,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <TextAndIcon Icon={iconMap[icon]} />
              <Typography
                sx={{
                  position: 'absolute',
                  ...textPositions[i],
                  opacity: 0,
                  animation: `${textFadeIn} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                  animationDelay: `${textDelays[i]}s`,
                  whiteSpace: 'nowrap',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {text}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
