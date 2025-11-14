import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    // Get all communities with member counts and posts counts
    const communities = await prisma.community.findMany({
      include: {
        _count: {
          select: {
            members: true,
            posts: true,
          },
        },
        members: userId ? {
          where: {
            userId: userId,
          },
        } : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to match the expected format
    const transformedCommunities = communities.map((community) => ({
      id: community.id,
      name: community.name,
      slug: community.slug,
      description: community.description || '',
      coverImage: community.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      memberCount: community._count.members,
      postCount: community._count.posts,
      tags: community.tags,
      isJoined: userId ? community.members.length > 0 : false,
    }));

    return NextResponse.json(transformedCommunities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    );
  }
}
