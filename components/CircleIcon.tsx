import { ReactElement } from 'react';

import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Box, Stack, Typography } from '@mui/material';

interface DataProp {
  icon: 'chat' | 'community' | 'health';
  text: string;
}

const TextAndIcon = ({ Icon, text }: { Icon: ReactElement; text: string }) => {
  return (
    <Stack alignItems={'center'}>
      <Box sx={{ width: '40px', height: '40px', display: 'grid', placeContent: 'center' }}>{Icon}</Box>
      {/* <Typography>{text}</Typography> */}
    </Stack>
  );
};

export default function CicleIcon({ data }: { data: DataProp[] }) {
  const iconMap = {
    chat: <ForumIcon fontSize="large" sx={{ fontSize: '75px' }} />,
    community: <PeopleIcon fontSize="large" sx={{ fontSize: '75px' }} />,
    health: <HealthAndSafetyIcon fontSize="large" sx={{ fontSize: '75px' }} />,
  };

  // Calculate positions on circle circumference
  const circleRadius = 200; // Half of the 400px width/height
  const iconCount = data.length;

  // Custom angles for top-left, top-right, bottom-center
  const customAngles = [
    (5 * Math.PI) / 4 - 0.15, // Top-left (225 degrees + ~9 degrees lower)
    (7 * Math.PI) / 4 + 0.15, // Top-right (315 degrees + ~9 degrees lower)
    Math.PI / 2, // Bottom-center (90 degrees)
  ];

  const iconPositions = customAngles.map((angle) => ({
    x: circleRadius * Math.cos(angle),
    y: circleRadius * Math.sin(angle),
  }));

  return (
    <Box
      sx={{
        height: '400px',
        width: '400px',
        borderRadius: '50%',
        border: '10px solid #999',
        position: 'relative',
      }}
    >
      {data.map(({ icon, text }, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(${iconPositions[i].x}px, ${iconPositions[i].y}px) translate(-50%, -50%)`,
          }}
        >
          <TextAndIcon Icon={iconMap[icon]} text={text} />
        </Box>
      ))}
    </Box>
  );
}
