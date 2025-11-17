import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest, context: { params: Promise<{ commentId: string }> }) {
  try {
    const { commentId } = await context.params;
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
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.isDeleted) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check if user already hearted
    const existingHeart = await prisma.commentHeart.findUnique({
      where: {
        commentId_userId: {
          commentId: commentId,
          userId: userId,
        },
      },
    });

    let hearted: boolean;
    let heartCount: number;

    if (existingHeart) {
      // Remove heart (toggle off)
      await prisma.$transaction(async (tx) => {
        await tx.commentHeart.delete({
          where: { id: existingHeart.id },
        });

        await tx.comment.update({
          where: { id: commentId },
          data: {
            heartCount: { decrement: 1 },
          },
        });
      });

      hearted = false;
      heartCount = comment.heartCount - 1;
    } else {
      // Add heart (toggle on)
      await prisma.$transaction(async (tx) => {
        await tx.commentHeart.create({
          data: {
            commentId: commentId,
            userId: userId,
          },
        });

        await tx.comment.update({
          where: { id: commentId },
          data: {
            heartCount: { increment: 1 },
          },
        });
      });

      hearted = true;
      heartCount = comment.heartCount + 1;
    }

    return NextResponse.json({
      hearted,
      heartCount,
    });
  } catch (error) {
    console.error('Error toggling heart:', error);
    return NextResponse.json({ error: 'Failed to toggle heart' }, { status: 500 });
  }
}
