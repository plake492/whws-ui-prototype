import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface SponsorCardProps {
  sponsor: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    shortBio: string;
    category: string;
    isFeatured: boolean;
    _count?: { offers: number };
  };
  offerCount?: number;
}

export default function SponsorCard({ sponsor, offerCount }: SponsorCardProps) {
  const displayOfferCount = offerCount ?? sponsor._count?.offers ?? 0;

  return (
    <Link href={`/sponsors/${sponsor.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'grey.50',
            height: 180,
          }}
        >
          <Box sx={{ position: 'relative', width: 140, height: 140 }}>
            <Image
              src={sponsor.logoUrl}
              alt={`${sponsor.name} logo`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" component="h3" sx={{ flex: 1 }}>
              {sponsor.name}
            </Typography>
            {sponsor.isFeatured && <Chip label="⭐ Featured" size="small" color="primary" />}
          </Box>

          <Chip label={sponsor.category} size="small" sx={{ mb: 1.5 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
            {sponsor.shortBio}
          </Typography>

          {displayOfferCount > 0 && (
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
              {displayOfferCount} Active Offer{displayOfferCount !== 1 ? 's' : ''}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
