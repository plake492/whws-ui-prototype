import { NextRequest, NextResponse } from 'next/server';
import { generateQRCode, QRCodeData } from '@/lib/qrCode';
import { prisma } from '@/lib/prisma';
import { requireApiAuth } from '@/lib/supabase-server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: offerId } = await params;

    const user = await requireApiAuth();
    if (user instanceof NextResponse) return user;

    const userId = user.id;

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
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
