import { Box } from '@mui/material';
import NextImage from 'next/image';

export default function Logo() {
  return (
    <Box sx={{ width: '200px', height: 'auto' }}>
      <NextImage
        src={'/WHWS-logo.webp'}
        width={200}
        height={200}
        alt="Logo"
        objectFit="cover"
        style={{ objectFit: 'contain' }}
      />
      ;
    </Box>
  );
}
