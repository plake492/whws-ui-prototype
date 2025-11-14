'use client';

import { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CATEGORIES = ['Menopause', 'Breast Cancer'];

export default function Header() {
  const router = useRouter();
  const [communityAnchorEl, setCommunityAnchorEl] = useState<null | HTMLElement>(null);
  const [chatAnchorEl, setChatAnchorEl] = useState<null | HTMLElement>(null);

  const isCommunityOpen = Boolean(communityAnchorEl);
  const isChatOpen = Boolean(chatAnchorEl);

  const handleCommunityMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setCommunityAnchorEl(event.currentTarget);
  };

  const handleChatMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setChatAnchorEl(event.currentTarget);
  };

  const handleCommunityMouseLeave = () => {
    setCommunityAnchorEl(null);
  };

  const handleChatMouseLeave = () => {
    setChatAnchorEl(null);
  };

  const handleCommunityNavigate = (category: string) => {
    router.push(`/community/${category.toLowerCase().replace(' ', '-')}`);
    handleCommunityMouseLeave();
  };

  const handleChatNavigate = (category: string) => {
    if (category === 'Chat') return router.push(`/chat/`);
    router.push(`/chat/${category.toLowerCase().replace(' ', '-')}`);
    handleChatMouseLeave();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={({ palette }) => ({
        bgcolor: 'transparent',
        borderBottom: `1px solid ${palette.divider}`,
      })}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              color: '#000',
            }}
            onClick={() => router.push('/')}
          >
            WHWS
          </Typography>

          {/* Navigation Links */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Community Dropdown */}
            <Box onMouseLeave={handleCommunityMouseLeave}>
              <Button
                onMouseEnter={handleCommunityMouseEnter}
                onClick={() => router.push('/communities')}
                // endIcon={<KeyboardArrowDownIcon />}
                sx={({ palette }) => ({
                  color: 'text.primary',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                })}
              >
                Communities
              </Button>
              {/* <Menu
                anchorEl={communityAnchorEl}
                open={isCommunityOpen}
                onClose={handleCommunityMouseLeave}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                slotProps={{
                  paper: {
                    onMouseLeave: handleCommunityMouseLeave,
                    sx: {
                      mt: 1,
                      minWidth: 250,
                    },
                  },
                }}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleCommunityNavigate(category)}
                    sx={{
                      py: 2,
                      px: 3,
                      fontSize: '1.1rem',
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>

            {/* Chat Dropdown */}
            <Box onMouseLeave={handleChatMouseLeave}>
              <Button
                onMouseEnter={handleChatMouseEnter}
                onClick={() => router.push('/chat')}
                // endIcon={<KeyboardArrowDownIcon />}
                sx={({ palette }) => ({
                  color: 'text.primary',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                })}
              >
                Chat
              </Button>
              {/* <Menu
                anchorEl={chatAnchorEl}
                open={isChatOpen}
                onClose={handleChatMouseLeave}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                slotProps={{
                  paper: {
                    onMouseLeave: handleChatMouseLeave,
                    sx: {
                      mt: 1,
                      minWidth: 250,
                    },
                  },
                }}
              >
                {['Chat', ...CATEGORIES].map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleChatNavigate(category)}
                    sx={{
                      py: 2,
                      px: 3,
                      fontSize: '1.1rem',
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
          </Stack>

          {/* Auth Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              sx={({ palette }) => ({
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '1rem',
              })}
              onClick={() => router.push('/signin')}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={({ palette }) => ({
                bgcolor: palette.primary.main,
                color: palette.primary.contrastText,
                textTransform: 'none',
                fontSize: '1rem',
                px: 3,
                py: 0.5,
                '&:hover': {
                  bgcolor: palette.primary.dark,
                },
              })}
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
