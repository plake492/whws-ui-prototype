import CommunityCards from './CommunityCards';
import { prisma } from '@/lib/prisma';
import { Community } from '@/types';

type CommunityWithCount = Omit<Community, 'memberCount'> & {
  memberCount: number | null;
  members: number;
};

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

  // Transform data to match Community type with serialized Decimal
  const communities: CommunityWithCount[] = rawCommunities.map((community) => ({
    ...community,
    memberCount: community.memberCount ? Number(community.memberCount) : null,
    members: community._count?.members || 0,
  }));

  return <CommunityCards communities={communities} />;
};

export default CommunitySection;
