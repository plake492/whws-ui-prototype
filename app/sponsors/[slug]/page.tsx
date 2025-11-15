'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import SponsorHero from '@/components/sponsors/SponsorHero';
import RichTextRenderer from '@/components/sponsors/RichTextRenderer';
import OfferCard from '@/components/offers/OfferCard';
import OfferModal from '@/components/offers/OfferModal';
import { getSponsorBySlug, getOffersBySponsor } from '@/lib/dummySponsors';

export default function SponsorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const sponsor = getSponsorBySlug(params.slug as string);
  const offers = sponsor ? getOffersBySponsor(sponsor.id) : [];

  if (!sponsor) {
    return (
      <Box>
        <Header />
        <Container sx={{ py: 4 }}>
          <Typography variant="h4">Sponsor not found</Typography>
          <Button onClick={() => router.push('/sponsors')} sx={{ mt: 2 }}>
            Back to Sponsors
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Header />

      <SponsorHero sponsor={sponsor} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/sponsors')} sx={{ mb: 3 }}>
          Back to Sponsors
        </Button>

        {/* Description */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            About {sponsor.name}
          </Typography>
          <RichTextRenderer content={sponsor.description} />
        </Box>

        {/* Offers */}
        {offers.length > 0 && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Current Offers
            </Typography>
            <Grid container spacing={3}>
              {offers.map((offer) => (
                <Grid key={offer.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <OfferCard offer={offer} onViewDetails={() => setSelectedOffer(offer)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {offers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No active offers at this time
            </Typography>
          </Box>
        )}
      </Container>

      {/* Offer Modal */}
      {selectedOffer && (
        <OfferModal open={Boolean(selectedOffer)} onClose={() => setSelectedOffer(null)} offer={selectedOffer} />
      )}
    </Box>
  );
}
