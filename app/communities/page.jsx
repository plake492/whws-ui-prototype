'use client';

import { Container, Typography, Grid, Box, TextField, InputAdornment, Tabs, Tab, Stack, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import CommunityCard from '@/components/CommunityCard';
import PostCard from '@/components/PostCard';
import { dummyPosts, getUserById } from '@/lib/dummyData';
import Header from '@/components/Header';

export default function CommunitiesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/communities');
      if (response.ok) {
        const data = await response.json();
        setCommunities(data);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myCommunities = filteredCommunities.filter((c) => c.isJoined);
  const discoverCommunities = filteredCommunities;

  return (
    <Box
      sx={{
        bgcolor: 'rgb(253, 206, 99)',
      }}
    >
      <Header />
      {/* <Container maxWidth="lg" sx={{ py: 4 }}> */}
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6, bgcolor: '#ffffff' }}>
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
      {myCommunities.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              My Communities
            </Typography>
            <Grid container spacing={3}>
              {myCommunities.slice(0, 3).map((community) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={community.id}>
                  <CommunityCard community={community} onJoinChange={fetchCommunities} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

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

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : discoverCommunities.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No communities found
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {discoverCommunities.map((community) => (
                <Grid item key={community.id} size={12}>
                  <CommunityCard key={community.id} community={community} variant="horizontal" onJoinChange={fetchCommunities} />
                </Grid>
              ))}
            </Grid>
          )}
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
              <PostCard key={post.id} post={post} author={getUserById(post.authorId)} />
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
