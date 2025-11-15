import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // TODO: Uncomment when database is connected
    /*
    const sponsors = await prisma.sponsor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { offers: true },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json(sponsors);
    */

    // Temporary: Return dummy data
    const { dummySponsors, dummyOffers } = await import('@/lib/dummySponsors');
    const sponsors = dummySponsors.map((sponsor) => ({
      ...sponsor,
      _count: {
        offers: dummyOffers.filter((o) => o.sponsorId === sponsor.id).length,
      },
    }));

    return NextResponse.json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json({ error: 'Failed to fetch sponsors' }, { status: 500 });
  }
}
