import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await context.params;

    // Get top-level comments with nested replies
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentId: null, // Only top-level comments
        isDeleted: false,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            aiLearningConsent: true,
            showInChannelOnly: true,
          },
        },
        replies: {
          where: { isDeleted: false },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            hearts: {
              select: {
                userId: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        hearts: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // Newest first
    });

    return NextResponse.json({
      comments,
      count: comments.length,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
