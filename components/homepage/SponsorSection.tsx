'use client';

import SponsorCarousel from '@/components/sponsors/SponsorCarousel';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { getFeaturedSponsors } from '@/lib/dummySponsors';

const SponsorSection = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 12, px: { xs: 3, md: 8 } }}>
      <Container maxWidth={false}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" color="text.secondary" gutterBottom>
            Our Sponsors
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 3, maxWidth: '800px', mx: 'auto' }}>
            Trusted partners supporting women's health and wellness. Explore exclusive offers, discounts, and resources
            tailored for you.
          </Typography>
        </Box>
      </Container>
      <SponsorCarousel sponsors={getFeaturedSponsors()} />
      <Container maxWidth="lg" sx={{ mt: 3, textAlign: 'center' }}>
        <Button variant="outlined" component={Link} href="/sponsors">
          View All Sponsors
        </Button>
      </Container>
    </Box>
  );
};

export default SponsorSection;
