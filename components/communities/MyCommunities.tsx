'use client';

import { Typography, Grid, Box, Stack } from '@mui/material';
import { CommunitiesProps } from '@/types';
import Link from 'next/link';

const MyCommunities = ({ communities }: CommunitiesProps) => {
  return (
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
        {communities.map((community) => (
          <Grid
            container
            key={community.id}
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
              <Typography component={Link} variant="body1" href={`/communities/${community.slug}`}>
                {community.name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export default MyCommunities;
