'use client';

import Grid from '@mui/material/Grid';
import { CommunityWithUser, User } from '@/types';
import CommunitiesHero from '@/components/communities/CommunitiesHero';
import MyCommunities from '@/components/communities/MyCommunities';
import RecentActivity from '@/components/communities/RecentActivity';
import DiscoverCommunities from '@/components/communities/DiscoverCommunities';

interface CommunityAndUser {
  user: User | null;
  allCommunities: CommunityWithUser[];
  usersCommunities: CommunityWithUser[];
}

const _render = ({ user, usersCommunities, allCommunities }: CommunityAndUser) => {
  console.log('user ==>', user);

  return (
    <>
      <CommunitiesHero />
      {user ? (
        <Grid container columnSpacing={4}>
          <Grid size={2}>
            <MyCommunities communities={usersCommunities} />
          </Grid>
          <Grid size={7}>
            {/* // TODO Fetch community Activity */}
            <RecentActivity />
          </Grid>
          <Grid size={3}>
            <DiscoverCommunities communities={allCommunities} />
          </Grid>
        </Grid>
      ) : (
        <DiscoverCommunities communities={allCommunities} fullscreen />
      )}
    </>
  );
};

export default _render;
