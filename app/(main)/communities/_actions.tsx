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
  const supabaseUser = await getSupabaseUser();

  const user = supabaseUser
    ? await prisma.users.findUnique({
        where: {
          id: supabaseUser.id,
        },
      })
    : null;

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

export const getCommunityBySlug = async (slug: string) => {
  const rawCommunity = await prisma.community.findFirstOrThrow({
    where: {
      slug,
    },
  });

  return { ...rawCommunity, memberCount: rawCommunity.memberCount ? Number(rawCommunity.memberCount) : 0 };
};
