'use client';

import { CommunityWithUser } from '@/types';
import { Typography, Grid, Box } from '@mui/material';
import CommunitiesCard from '@/components/communities/CommunitiesCard';

const DiscoverCommunities = ({ communities }: { communities: CommunityWithUser[] }) => {
  return (
    <Box sx={{ mb: 6, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Discover Communities
      </Typography>

      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid key={community.id} size={12}>
            <CommunitiesCard community={community} variant="vertical" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscoverCommunities;
