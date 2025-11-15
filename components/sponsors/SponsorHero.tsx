import { Box, Container, Typography, Chip, Stack, IconButton } from '@mui/material';
import { Language, Phone, Email, Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';

interface SponsorHeroProps {
  sponsor: {
    name: string;
    logoUrl: string;
    heroImageUrl?: string;
    category: string;
    healthFocus: string[];
    website?: string;
    phone?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function SponsorHero({ sponsor }: SponsorHeroProps) {
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      {/* Hero Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 250, md: 400 },
          bgcolor: 'grey.200',
        }}
      >
        {sponsor.heroImageUrl && (
          <Image src={sponsor.heroImageUrl} alt={sponsor.name} fill style={{ objectFit: 'cover' }} priority />
        )}

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          }}
        />
      </Box>

      {/* Content */}
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            mt: { xs: -8, md: -12 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              bgcolor: 'white',
              borderRadius: 2,
              p: 2,
              boxShadow: 3,
              flexShrink: 0,
            }}
          >
            <Image
              src={sponsor.logoUrl}
              alt={`${sponsor.name} logo`}
              fill
              style={{ objectFit: 'contain', padding: '8px' }}
            />
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {sponsor.name}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip label={sponsor.category} color="primary" />
              {sponsor.healthFocus.map((focus) => (
                <Chip key={focus} label={focus} variant="outlined" size="small" />
              ))}
            </Stack>

            {/* Contact Info */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {sponsor.website && (
                <IconButton
                  component="a"
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Language />
                </IconButton>
              )}
              {sponsor.phone && (
                <IconButton
                  component="a"
                  href={`tel:${sponsor.phone}`}
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Phone />
                </IconButton>
              )}
              {sponsor.email && (
                <IconButton
                  component="a"
                  href={`mailto:${sponsor.email}`}
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Email />
                </IconButton>
              )}
              {sponsor.facebook && (
                <IconButton
                  component="a"
                  href={sponsor.facebook}
                  target="_blank"
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Facebook />
                </IconButton>
              )}
              {sponsor.instagram && (
                <IconButton
                  component="a"
                  href={sponsor.instagram}
                  target="_blank"
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Instagram />
                </IconButton>
              )}
              {sponsor.twitter && (
                <IconButton
                  component="a"
                  href={sponsor.twitter}
                  target="_blank"
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Twitter />
                </IconButton>
              )}
              {sponsor.linkedin && (
                <IconButton
                  component="a"
                  href={sponsor.linkedin}
                  target="_blank"
                  size="small"
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <LinkedIn />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
