'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Dashboard, Settings, Logout } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user, signOut } = useAuth();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // Add logout logic here
    console.log('Logout clicked');
  };
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.background.paper}EE 40%, ${theme.palette.background.default}EE 100%)`,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          height: '100px',
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
              <Box sx={{ ...linkStyles, mr: 4 }}>
                <Link href={'/chat'}>Chat</Link>
              </Box>
              {user ? (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar
                    onClick={handleAvatarClick}
                    sx={{
                      width: 40,
                      height: 40,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      bgcolor: 'primary.main',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    JD
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                      paper: {
                        elevation: 3,
                        sx: {
                          mt: 1.5,
                          minWidth: 200,
                          borderRadius: 2,
                        },
                      },
                    }}
                  >
                    <MenuItem component={Link} href="/dashboard">
                      <ListItemIcon>
                        <Dashboard fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Dashboard</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} href="/settings">
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText onClick={signOut}>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <>
                  <Typography sx={{ color: 'text.primary', fontWeight: 500 }} variant="subtitle1">
                    <Link href={'/login'}>Login</Link>
                  </Typography>
                  <Link href={'/signup'}>
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
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ paddingTop: '100px' }}>{children}</Box>
    </>
  );
};

export default Navigation;
