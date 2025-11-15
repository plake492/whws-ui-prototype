'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from '@mui/material';
import { LocalOffer, CalendarToday } from '@mui/icons-material';
import Image from 'next/image';

interface OfferCardProps {
  offer: {
    id: string;
    title: string;
    description: string;
    discountDetails: string;
    imageUrl?: string;
    validUntil?: Date | null;
    currentRedemptions: number;
    totalLimit?: number | null;
    isFeatured: boolean;
  };
  onViewDetails: () => void;
}

export default function OfferCard({ offer, onViewDetails }: OfferCardProps) {
  const isExpired = offer.validUntil && new Date(offer.validUntil) < new Date();
  const isLimitReached = offer.totalLimit && offer.currentRedemptions >= offer.totalLimit;
  const isAvailable = !isExpired && !isLimitReached;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: isAvailable ? 1 : 0.6,
      }}
    >
      {offer.imageUrl && (
        <Box sx={{ position: 'relative', height: 200 }}>
          <Image src={offer.imageUrl} alt={offer.title} fill style={{ objectFit: 'cover' }} />
          {offer.isFeatured && (
            <Chip
              label="Featured"
              color="secondary"
              size="small"
              sx={{ position: 'absolute', top: 12, right: 12 }}
            />
          )}
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {offer.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <LocalOffer fontSize="small" color="primary" />
          <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
            {offer.discountDetails}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {offer.description}
        </Typography>

        {offer.validUntil && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            <CalendarToday fontSize="small" />
            <Typography variant="caption" color={isExpired ? 'error' : 'text.secondary'}>
              {isExpired ? 'Expired' : `Valid until ${formatDate(offer.validUntil)}`}
            </Typography>
          </Box>
        )}

        {offer.totalLimit && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            {offer.currentRedemptions} / {offer.totalLimit} claimed
          </Typography>
        )}

        <Button
          variant={isAvailable ? 'contained' : 'outlined'}
          fullWidth
          onClick={onViewDetails}
          disabled={!isAvailable}
        >
          {isExpired ? 'Expired' : isLimitReached ? 'Limit Reached' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
