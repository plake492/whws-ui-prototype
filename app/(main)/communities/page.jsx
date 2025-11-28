'use client';

import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Search, Toys } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import CommunitiesCard from '@/components/communities/CommunitiesCard';
import CommunitiesHero from '@/components/communities/CommunitiesHero';

import PostCard from '@/components/PostCard';
import { dummyPosts, getUserById } from '@/lib/dummyData';

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
        p: 4,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        flex: 1,
        position: 'relative',
      }}
    >
      {/* Hero Section */}
      <CommunitiesHero />

      <Grid container columnSpacing={4}>
        <Grid size={2}>
          <Box
            sx={{
              width: '100%',
              minHeight: '90dvh',
              backgroundColor: 'background.default',
              borderRadius: '12px',
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 6, fontWeight: 600 }}>
              My Communities
            </Typography>
            <Stack direction={'column'} gap={2}>
              {Array.from({ length: 5 }, (_, index) => (
                <Grid
                  container
                  sx={{
                    borderWidth: 0.5,
                    borderStyle: 'solid',
                    borderColor: 'background.default',
                    transition: 'border-color 200ms ease-in-out, bacground-color 250ms ease-in-out',
                    borderRadius: '12px',
                    pl: 2,
                    pr: 4,
                    py: 1.5,
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: (theme) => `${theme.palette.primary.light}50`,
                    },
                  }}
                >
                  <Grid>
                    <Box>My community</Box>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid size={7}>
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
        </Grid>
        <Grid size={3}>
          <Box sx={{ mb: 6, p: 3 }}>
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
                    <CommunitiesCard
                      key={community.id}
                      community={community}
                      variant="horizontal"
                      onJoinChange={fetchCommunities}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
