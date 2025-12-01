'use client';

import { Container, Typography, Box, Button, Stack, Chip, Card, CardContent, Avatar, Grid } from '@mui/material';
import { People, Forum, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { getUserById } from '@/lib/dummyData';
import { formatTimeAgo } from '@/utils/formatTime';
import MyCommunities from '@/components/communities/MyCommunities';

export default function CommunityPage({ usersCommunities, community }: any) {
  if (!community) {
    return (
      <>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4">Community not found</Typography>
          <Button component={Link} href="/communities" sx={{ mt: 2 }}>
            Back to Communities
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Grid container columnSpacing={4}>
        {/* <Grid size={2}>
          <MyCommunities communities={usersCommunities} />
        </Grid> */}
        <Grid size={10}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button component={Link} href="/communities" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
              Back to Communities
            </Button>

            {/* Community Header */}
            <Box
              sx={{
                backgroundImage: `url(${community.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
                borderRadius: 2,
                mb: 3,
              }}
            />

            <Box mb={4}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {community.name}
              </Typography>

              <Stack direction="row" spacing={3} mb={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <People />
                  <Typography>{community.memberCount.toLocaleString()} members</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Forum />
                  <Typography>{community.postCount} posts</Typography>
                </Box>
              </Stack>

              <Typography variant="body1" color="text.secondary" mb={2}>
                {community.description}
              </Typography>

              <Stack direction="row" spacing={1} mb={3} sx={{ flexWrap: 'wrap' }}>
                {community.tags.map((tag: any) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>

              <Button
                component={Link}
                variant={community.isJoined ? 'outlined' : 'contained'}
                size="large"
                href={`/communities/join?community=${community.slug}`}
                // href={`/communities/join/${community.slug}`}
              >
                Join Community
              </Button>
            </Box>

            {/* Posts */}
            <Typography variant="h5" fontWeight={600} mb={3}>
              Recent Posts
            </Typography>

            <Stack spacing={2}>
              {community.posts && community.posts.length > 0 ? (
                community.posts.map((post: any) => {
                  const author = getUserById(post.authorId);
                  return (
                    <Card key={post.id}>
                      <CardContent>
                        <Stack direction="row" spacing={2} mb={2}>
                          <Avatar src={author?.avatar} />
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {author?.displayName || 'Anonymous'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTimeAgo(post.createdAt)}
                            </Typography>
                          </Box>
                        </Stack>

                        <Typography variant="h6" fontWeight={600} mb={1}>
                          {post.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {post.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No posts yet. Be the first to post!
                  </Typography>
                </Box>
              )}
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
