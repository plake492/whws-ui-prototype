'use client';

import Grid from '@mui/material/Grid';
import { CommunitiesProps } from '@/types';

import CommunitiesHero from '@/components/communities/CommunitiesHero';
import MyCommunities from '@/components/communities/MyCommunities';
import RecentActivity from '@/components/communities/RecentActivity';
import DiscoverCommunities from '@/components/communities/DiscoverCommunities';

const _render = ({ communities }: CommunitiesProps) => {
  return (
    <>
      <CommunitiesHero />
      <Grid container columnSpacing={4}>
        <Grid size={2}>
          <MyCommunities />
        </Grid>
        <Grid size={7}>
          <RecentActivity />
        </Grid>
        <Grid size={3}>
          <DiscoverCommunities communities={communities} />
        </Grid>
      </Grid>
    </>
  );
};

export default _render;
