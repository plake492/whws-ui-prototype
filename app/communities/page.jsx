'use client';

import { Container, Typography, Grid, Box, TextField, InputAdornment, Tabs, Tab, Stack } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import CommunityCard from '@/components/CommunityCard';
import PostCard from '@/components/PostCard';
import { dummyCommunities, dummyPosts } from '@/lib/dummyData';
import Header from '@/components/Header';

export default function CommunitiesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = dummyCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={({ palette }) => ({
        bgcolor: palette.accent.yellow,
      })}
    >
      <Header />
      {/* <Container maxWidth="lg" sx={{ py: 4 }}> */}
      {/* Hero Section */}
      <Box sx={({ palette }) => ({ textAlign: 'center', mb: 6, bgcolor: palette.background.paper })}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Welcome to the Community Hub
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Connect, share, and learn from others on similar health journeys
          </Typography>

          <TextField
            fullWidth
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 600, mx: 'auto' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* My Communities */}
      <Box sx={{ mb: 6 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            My Communities
          </Typography>
          <Grid container spacing={3}>
            {filteredCommunities.slice(0, 3).map((community) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={community.id}>
                <CommunityCard community={community} isJoined />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Discover Communities */}
      <Box sx={{ mb: 6 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Discover Communities
          </Typography>

          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="All Communities" />
            <Tab label="Most Active" />
            <Tab label="Newest" />
            <Tab label="Recommended" />
          </Tabs>

          <Grid container spacing={3}>
            {filteredCommunities.map((community) => (
              <Grid item key={community.id} size={12}>
                <CommunityCard key={community.id} community={community} variant="horizontal" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Stack spacing={2}>
            {dummyPosts.slice(0, 5).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
