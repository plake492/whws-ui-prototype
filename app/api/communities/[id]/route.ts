import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Try to find by ID or slug
    const community = await prisma.community.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
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
        posts: {
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!community) {
      return NextResponse.json(
        { error: 'Community not found' },
        { status: 404 }
      );
    }

    const transformedCommunity = {
      id: community.id,
      name: community.name,
      slug: community.slug,
      description: community.description || '',
      coverImage: community.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      memberCount: community._count.members,
      postCount: community._count.posts,
      tags: community.tags,
      isJoined: userId ? community.members.length > 0 : false,
      posts: community.posts,
    };

    return NextResponse.json(transformedCommunity);
  } catch (error) {
    console.error('Error fetching community:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community' },
      { status: 500 }
    );
  }
}
