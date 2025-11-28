import GradientWrapper from '@/components/GradientWrapper';
import { prisma } from '@/lib/prisma';
import Communities from './_render';

export default async function CommunitiesPage() {
  const rawCommunities = await prisma.community.findMany({});

  // Serialize Decimal types to numbers for client components
  const communities = rawCommunities.map((community) => ({
    ...community,
    memberCount: community.memberCount ? Number(community.memberCount) : 0,
  }));

  return (
    <GradientWrapper>
      <Communities communities={communities} />
    </GradientWrapper>
  );
}
