import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiAuth } from '@/lib/supabase-server';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: communityId } = await context.params;

    const user = await requireApiAuth();
    if (user instanceof NextResponse) return user;

    const userId = user.id;

    // Check if community exists
    const community = await prisma.community.findUnique({
      where: { id: communityId },
    });

    if (!community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 });
    }

    // Check if already a member
    const existingMember = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json({ error: 'Already a member' }, { status: 400 });
    }

    // Create membership
    await prisma.communityMember.create({
      data: {
        userId,
        communityId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining community:', error);
    return NextResponse.json({ error: 'Failed to join community' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: communityId } = await context.params;

    const user = await requireApiAuth();
    if (user instanceof NextResponse) return user;

    const userId = user.id;

    // Delete membership
    await prisma.communityMember.delete({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error leaving community:', error);
    return NextResponse.json({ error: 'Failed to leave community' }, { status: 500 });
  }
}
