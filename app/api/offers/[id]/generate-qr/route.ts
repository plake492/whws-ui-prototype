import { NextRequest, NextResponse } from 'next/server';
import { generateQRCode, QRCodeData } from '@/lib/qrCode';
// import { prisma } from '@/lib/prisma';
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: offerId } = await params;

    // TODO: Uncomment when auth is connected
    /*
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

    // Check if offer exists and is valid
    const offer = await prisma.offer.findUnique({
      where: { id: offerId, isActive: true },
    });

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    // Check if expired
    if (offer.validUntil && offer.validUntil < new Date()) {
      return NextResponse.json({ error: 'Offer has expired' }, { status: 400 });
    }

    // Check if already redeemed
    const existingRedemption = await prisma.offerRedemption.findUnique({
      where: {
        offerId_userId: { offerId, userId },
      },
    });

    if (existingRedemption) {
      return NextResponse.json({ error: 'Offer already redeemed' }, { status: 400 });
    }

    // Generate QR code
    const qrData: QRCodeData = {
      offerId,
      userId,
      timestamp: Date.now(),
      offerTitle: offer.title,
    };

    const qrCode = await generateQRCode(qrData);

    return NextResponse.json({ qrCode });
    */

    // Temporary: Generate QR without auth check
    const { getOfferById } = await import('@/lib/dummySponsors');
    const offer = getOfferById(offerId);

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    const qrData: QRCodeData = {
      offerId,
      userId: 'demo-user',
      timestamp: Date.now(),
      offerTitle: offer.title,
    };

    const qrCode = await generateQRCode(qrData);

    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
