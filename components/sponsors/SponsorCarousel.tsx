'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface Sponsor {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  heroImageUrl?: string;
  shortBio?: string;
}

interface SponsorCarouselProps {
  sponsors: Sponsor[];
}

export default function SponsorCarousel({ sponsors }: SponsorCarouselProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (sponsors.length <= 1) return;

    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % sponsors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  if (sponsors.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      {sponsors.map((sponsor, index) => (
        <Link
          key={sponsor.id}
          href={`/sponsors/${sponsor.slug}`}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <Box
            sx={{
              position: 'relative',
              bgcolor: 'transparent',
              borderRadius: 2,
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '2px solid',
              borderColor: index === highlightedIndex ? 'primary.main' : 'transparent',
              filter: index === highlightedIndex ? 'brightness(1.05)' : 'brightness(1)',
              '&:hover': {
                borderColor: 'primary.main',
                filter: 'brightness(1.05)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 120,
                mb: 2,
                '& img': {
                  mixBlendMode: 'multiply',
                },
              }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              {sponsor.name}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
