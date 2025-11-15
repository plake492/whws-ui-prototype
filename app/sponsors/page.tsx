'use client';

import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Header from '@/components/Header';
import SponsorCard from '@/components/sponsors/SponsorCard';
import { dummySponsors, dummyOffers } from '@/lib/dummySponsors';

export default function SponsorsPage() {
  const sponsors = dummySponsors.map((sponsor) => ({
    ...sponsor,
    _count: {
      offers: dummyOffers.filter((o) => o.sponsorId === sponsor.id).length,
    },
  }));

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 700 }}>
          Our Sponsors
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Discover exclusive offers from our trusted partners
        </Typography>

        <Grid container spacing={3}>
          {sponsors.map((sponsor) => (
            <Grid key={sponsor.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SponsorCard sponsor={sponsor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
