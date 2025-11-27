import CommunityCards from './CommunityCards';
import { prisma } from '@/lib/prisma';

const CommunitySection = async () => {
  // Get all communities with member counts
  const rawCommunities = await prisma.community.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform data to match Community type
  const communities = rawCommunities.map((community) => ({
    ...community,
    memberCount: community.memberCount ? Number(community.memberCount) : null,
    members: community._count?.members || 0,
  }));

  console.log('Communities fetched:', communities.length);
  console.log('First community:', communities[0]);

  return <CommunityCards communities={communities} />;
};

export default CommunitySection;
