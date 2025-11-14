'use client';

import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Stack } from '@mui/material';
import { People, Forum, TrendingUp } from '@mui/icons-material';
import Link from 'next/link';

export default function CommunityCard({ community, variant = 'vertical', isJoined = false }) {
  const stats = [
    { icon: <People fontSize="small" />, label: `${community.memberCount.toLocaleString()} members` },
    { icon: <Forum fontSize="small" />, label: `${community.postCount} discussions` },
  ];

  if (variant === 'horizontal') {
    return (
      <Card sx={{ display: 'flex', height: '100%', borderRadius: '12px' }}>
        <CardMedia
          component="img"
          sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
          image={community.coverImage}
          alt={community.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {community.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'wrap' }}>
              {community.description}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
              {community.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center" sx={{ flexWrap: 'wrap' }}>
              {stats.map((stat, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.icon}
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
              <Chip icon={<TrendingUp />} label="Active" size="small" color="success" />
            </Stack>
          </CardContent>

          <Box sx={{ p: 2, pt: 0 }}>
            {isJoined ? (
              <Button component={Link} href={`/communities/${community.slug}`} variant="outlined" fullWidth>
                View Community
              </Button>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button component={Link} href={`/communities/${community.slug}`} variant="outlined" fullWidth>
                  View
                </Button>
                <Button variant="contained" fullWidth>
                  Join
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Card>
    );
  }

  // Vertical card
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height="140" image={community.coverImage} alt={community.name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {community.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {community.description.substring(0, 100)}...
        </Typography>

        <Stack direction="column" spacing={1}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {stat.icon}
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button component={Link} href={`/communities/${community.slug}`} variant="outlined" fullWidth>
          View Community
        </Button>
      </Box>
    </Card>
  );
}
