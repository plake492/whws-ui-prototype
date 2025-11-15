'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import { Close, LocalOffer } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import QRCodeDisplay from './QRCodeDisplay';

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  offer: {
    id: string;
    title: string;
    description: string;
    discountDetails: string;
    termsConditions: string;
    imageUrl?: string;
    validUntil?: Date | null;
  };
}

export default function OfferModal({ open, onClose, offer }: OfferModalProps) {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalOffer color="primary" />
          <Typography variant="h6">{offer.title}</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      {offer.imageUrl && (
        <Box sx={{ position: 'relative', height: 250 }}>
          <Image src={offer.imageUrl} alt={offer.title} fill style={{ objectFit: 'cover' }} />
        </Box>
      )}

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
        <Tab label="Details" />
        <Tab label="Redeem" />
      </Tabs>

      <DialogContent>
        {tabValue === 0 && (
          <Box>
            <Chip label={offer.discountDetails} color="primary" sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {offer.description}
            </Typography>

            {offer.validUntil && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Valid until: {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Terms & Conditions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {offer.termsConditions}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth onClick={() => setTabValue(1)}>
                Redeem Offer
              </Button>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <QRCodeDisplay offerId={offer.id} offerTitle={offer.title} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
