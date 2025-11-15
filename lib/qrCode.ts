import QRCode from 'qrcode';

export interface QRCodeData {
  offerId: string;
  userId: string;
  timestamp: number;
  offerTitle: string;
}

/**
 * Generate QR code as data URL
 */
export async function generateQRCode(data: QRCodeData): Promise<string> {
  const jsonString = JSON.stringify(data);

  try {
    const qrDataURL = await QRCode.toDataURL(jsonString, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Parse QR code data
 */
export function parseQRCodeData(qrString: string): QRCodeData | null {
  try {
    const data = JSON.parse(qrString);

    if (!data.offerId || !data.userId || !data.timestamp) {
      return null;
    }

    return data as QRCodeData;
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return null;
  }
}

/**
 * Validate QR code data
 */
export function validateQRCode(data: QRCodeData): {
  valid: boolean;
  error?: string;
} {
  // Check if data exists
  if (!data) {
    return { valid: false, error: 'Invalid QR code data' };
  }

  // Check timestamp (expire after 24 hours)
  const now = Date.now();
  const age = now - data.timestamp;
  const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

  if (age > MAX_AGE) {
    return { valid: false, error: 'QR code has expired' };
  }

  if (age < 0) {
    return { valid: false, error: 'Invalid QR code timestamp' };
  }

  return { valid: true };
}
