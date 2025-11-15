import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest, context: { params: Promise<{ commentId: string }> }) {
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

    // Get comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        replies: true,
      },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check ownership
    if (comment.authorId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Soft delete (preserve for context)
    await prisma.$transaction(async (tx) => {
      await tx.comment.update({
        where: { id: commentId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          content: '[deleted]', // Replace content
        },
      });

      // Update post comment count
      await tx.post.update({
        where: { id: comment.postId },
        data: {
          commentCount: { decrement: 1 + comment.replies.length },
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
