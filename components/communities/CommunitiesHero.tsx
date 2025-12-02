'use client';

import { Container, Typography, Box, TextField, InputAdornment, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

const CommunitiesHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Paper
      className="primary-gradient"
      elevation={0}
      sx={{
        border: 'none',
        textAlign: 'center',
        mb: 6,
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        borderRadius: '12px',
        px: { xs: 3, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: ({ palette }) => `${palette.primary.dark}22`,
          top: -250,
          right: -350,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: ({ palette }) => `${palette.primary.dark}22`,
          top: 150,
          left: -200,
        }}
      />
      <Container maxWidth={false} sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
          Welcome to the Community Hub
        </Typography>
        <Typography variant="h6" color="text.contrastText" sx={{ mb: 4 }}>
          Connect, share, and learn from others on similar health journeys
        </Typography>

        <Box
          sx={{
            py: 4,
            px: 2,
            borderRadius: '12px',
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper}EE 40%, ${theme.palette.background.default}EE 100%)`,
            mx: 40,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 800, mx: 'auto', borderColor: 'white' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Container>
    </Paper>
  );
};

export default CommunitiesHero;
