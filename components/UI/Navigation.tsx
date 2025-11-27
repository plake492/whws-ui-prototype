'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import React from 'react';

const linkStyles = {
  fontWeight: 500,
  fontSize: '1rem',
  color: 'text.primary',
  transition: 'all 0.2s ease',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    color: 'secondary.dark',
  },
};

const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.87)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
          <Toolbar sx={{ py: 3, justifyContent: 'space-between' }}>
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
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
              <Box sx={linkStyles}>
                <Link href={'/communities'}>Communities</Link>
              </Box>
              <Box sx={linkStyles}>
                <Link href={'/chat'}>Chat</Link>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.75,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Join Now
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ paddingTop: '100px' }}>{children}</Box>
    </>
  );
};

export default Navigation;
