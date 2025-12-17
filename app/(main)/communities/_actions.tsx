'use server';

import { prisma } from '@/lib/prisma';
import { getUser as getSupabaseUser } from '@/lib/supabase-server';
import { Community, User } from '@/types';

type CommunityWithUser = Omit<Community, 'memberCount'> & { memberCount: number; hasUser?: boolean };

export const getCommunities = async (): Promise<{
  user: User | null;
  allCommunities: CommunityWithUser[];
  usersCommunities: CommunityWithUser[];
}> => {
  const user = await getSupabaseUser();

  const userCommunities = user
    ? await prisma.communityMember.findMany({
        where: {
          userId: user.id,
        },
      })
    : [];

  const rawCommunities = await prisma.community.findMany({});

  // Serialize Decimal types to numbers for client components
  const communities: CommunityWithUser[] = rawCommunities.map((community) => ({
    ...community,
    memberCount: community.memberCount ? Number(community.memberCount) : 0,
  }));

  const communitiesWithUser = userCommunities.reduce<CommunityWithUser[]>((acc, curr) => {
    const communityFound = communities.find((community) => {
      if (community.id === curr.communityId) {
        community.hasUser = true;
        return true;
      }
    });

    return communityFound ? [...acc, communityFound] : acc;
  }, []);

  return { user, allCommunities: communities, usersCommunities: communitiesWithUser };
};

export const joinCommunity = async ({ communityId }: { communityId: string }) => {
  const user = await getSupabaseUser();

  if (!user) {
    console.error('[COMMUNITY]: No user');
    return null;
  }

  await prisma.communityMember.create({
    data: {
      userId: user?.id,
      communityId: communityId,
      joinedAt: new Date(),
    },
  });
};

export const getCommunityBySlug = async (slug: string) => {
  const rawCommunity = await prisma.community.findFirstOrThrow({
    where: {
      slug,
    },
  });

  return { ...rawCommunity, memberCount: rawCommunity.memberCount ? Number(rawCommunity.memberCount) : 0 };
};
export const leaveCommunity = async ({ communityId }: { communityId: string }) => {
  const user = await getSupabaseUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  await prisma.communityMember.delete({
    where: {
      userId_communityId: {
        userId: user.id,
        communityId: communityId,
      },
    },
  });
};
