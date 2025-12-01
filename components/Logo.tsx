import Link from 'next/link';
import { Typography } from '@mui/material';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: '1.75rem',
          color: 'text.secondary',
          letterSpacing: '-0.5px',
        }}
      >
        WHWS™
      </Typography>
    </Link>
  );
};

export default Logo;
