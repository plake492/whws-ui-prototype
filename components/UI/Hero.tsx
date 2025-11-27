'use client';

import { Box, Typography, Button } from '@mui/material';
import { HeroSection, DecorativeCircle, HeroGrid, StatsCard, StatItem } from '@/components/UI/StyledComponents';

const Hero = () => {
  return (
    <HeroSection>
      <DecorativeCircle size={600} top={-200} right={-200} />
      <DecorativeCircle size={400} bottom={-100} left={-100} opacity={0.05} />

      <HeroGrid>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h1" color="primary" sx={{ mb: 5 }}>
            Your health
            <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
              journey.
            </Box>
            Your community.
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 6, maxWidth: 600 }}>
            Connect with women who understand your experience. Get AI-powered support, expert guidance, and a community
            that's here for you every step of the way.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '35px',
                px: 5.5,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
              }}
            >
              Explore Communities
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                borderRadius: '35px',
                borderWidth: 2,
                px: 5.5,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderWidth: 2,
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        <Box>
          <StatsCard>
            {[
              { number: '1.3M+', label: 'Women enter menopause yearly' },
              { number: '45%', label: 'Women with cardiovascular disease' },
              { number: '27%', label: 'Experience mental health challenges' },
            ].map((stat, index) => (
              <StatItem key={index}>
                <Typography
                  sx={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'primary.main',
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {stat.label}
                </Typography>
              </StatItem>
            ))}
          </StatsCard>
        </Box>
      </HeroGrid>
    </HeroSection>
  );
};

export default Hero;
