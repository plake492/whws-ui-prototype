'use client';

import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { Download } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import { generateQRCode, QRCodeData } from '@/lib/qrCode';

interface QRCodeDisplayProps {
  offerId: string;
  offerTitle: string;
  userId?: string;
}

export default function QRCodeDisplay({ offerId, offerTitle, userId = 'demo-user' }: QRCodeDisplayProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQR = async () => {
    setLoading(true);
    setError(null);

    try {
      const qrData: QRCodeData = {
        offerId,
        userId,
        timestamp: Date.now(),
        offerTitle,
      };

      const qrDataURL = await generateQRCode(qrData);
      setQrCode(qrDataURL);
    } catch (err: any) {
      setError(err.message || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${offerTitle.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={handleGenerateQR} fullWidth>
          Try Again
        </Button>
      </Box>
    );
  }

  if (!qrCode) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Generate a QR code to redeem this offer at the sponsor location
        </Typography>
        <Button variant="contained" onClick={handleGenerateQR} disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Generate QR Code'}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Box
        sx={{
          position: 'relative',
          width: 300,
          height: 300,
          mx: 'auto',
          mb: 2,
        }}
      >
        <Image src={qrCode} alt="Offer QR Code" fill style={{ objectFit: 'contain' }} />
      </Box>

      <Button variant="outlined" startIcon={<Download />} onClick={handleDownload} sx={{ mb: 2 }} fullWidth>
        Download QR Code
      </Button>

      <Typography variant="caption" display="block" color="text.secondary">
        Show this QR code at checkout to redeem your offer
      </Typography>

      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
        Valid for 24 hours from generation
      </Typography>
    </Box>
  );
}
