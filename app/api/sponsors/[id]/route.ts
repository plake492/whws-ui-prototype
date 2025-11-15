import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // TODO: Uncomment when database is connected
    /*
    const sponsor = await prisma.sponsor.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
      },
      include: {
        offers: {
          where: { isActive: true },
          orderBy: { isFeatured: 'desc' },
        },
      },
    });

    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    return NextResponse.json(sponsor);
    */

    // Temporary: Return dummy data
    const { getSponsorById, getSponsorBySlug, getOffersBySponsor } = await import('@/lib/dummySponsors');

    let sponsor = getSponsorById(id);
    if (!sponsor) {
      sponsor = getSponsorBySlug(id);
    }

    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    const offers = getOffersBySponsor(sponsor.id);

    return NextResponse.json({ ...sponsor, offers });
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    return NextResponse.json({ error: 'Failed to fetch sponsor' }, { status: 500 });
  }
}
