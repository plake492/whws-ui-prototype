'use client';

import { Box, Container, Typography, Button } from '@mui/material';

// CTA Section - Full Width
const CTASection = () => {
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 12,
        px: { xs: 3, md: 8 },
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          top: -250,
          right: -100,
        }}
      />
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Ready to Take Control of Your Health Journey?
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, fontSize: '1.2rem', opacity: 0.95 }}>
          Join thousands of women who have found support, guidance, and community at WHWS.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Create Free Account
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Schedule a Demo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
