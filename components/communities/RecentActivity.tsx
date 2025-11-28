'use client';

import { Container, Typography, Box, Stack } from '@mui/material';

import PostCard from '@/components/PostCard';
import { dummyPosts, getUserById } from '@/lib/dummyData';

const RecentActivity = () => {
  return (
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
  );
};

export default RecentActivity;
