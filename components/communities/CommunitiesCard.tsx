'use client';

import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Stack } from '@mui/material';
import { People } from '@mui/icons-material';
import Link from 'next/link';
import { CommunityWithUser } from '@/types';

interface CommunitiesCardProps {
  community: CommunityWithUser;
  variant?: 'vertical' | 'horizontal';
}

export default function CommunitiesCard({ community, variant = 'vertical' }: CommunitiesCardProps) {
  const stats = [
    { icon: <People fontSize="small" />, label: `${community.memberCount?.toLocaleString() || 0} members` },
  ];

  if (variant === 'horizontal') {
    return (
      <Card sx={{ display: 'flex', height: '100%', borderRadius: '12px' }}>
        {community.coverImage && (
          <CardMedia
            component="img"
            sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
            image={community.coverImage}
            alt={community.name}
          />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Stack direction="row" gap={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
              {community.tags.slice(0, 3).map((tag: string) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {community.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'wrap' }}>
              {community.description}
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
          <ActionButtons community={community} />
        </Box>
      </Card>
    );
  }

  // Vertical card
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
      {community.coverImage && (
        <CardMedia component="img" height="140" image={community.coverImage} alt={community.name} />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" gap={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          {community.tags.slice(0, 3).map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {community.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {community.description?.substring(0, 100)}...
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

      <ActionButtons community={community} />
    </Card>
  );
}

const ActionButtons = ({ community }: { community: CommunitiesCardProps['community'] }) => {
  return (
    <Box sx={{ p: 2, pt: 0 }}>
      {community.hasUser ? (
        <Button
          fullWidth
          component={Link}
          href={`/communities/${community.slug}`}
          variant="contained"
          sx={{
            bgcolor: 'bacground.paper',
            color: 'text.dark',
            borderRadius: '30px',
            px: 4,
            py: 1,
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            },
          }}
        >
          View Community
        </Button>
      ) : (
        <Stack direction="row" spacing={1}>
          <Button
            sx={{
              bgcolor: 'bacground.paper',
              color: 'text.dark',
              borderRadius: '30px',
              px: 4,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              },
            }}
            component={Link}
            href={`/communities/${community.slug}`}
            variant="outlined"
            fullWidth
          >
            View
          </Button>

          <Button
            component={Link}
            href={`/communities/${community.slug}/join`}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: '30px',
              px: 4,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              },
            }}
            variant="contained"
            fullWidth
          >
            Join
          </Button>
        </Stack>
      )}
    </Box>
  );
};
