'use client';

import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography, Divider, Stack, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import baseTheme from '@/theme/baseTheme';

export default function UIKitPage() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            MammoChat UI Kit
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Design system and component library
          </Typography>
        </Box>

        {/* Color Palette */}
        <Section title="Color Palette">
          <Grid container spacing={3}>
            {/* Primary Colors */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Primary Colors
              </Typography>
            </Grid>
            <ColorSwatch color={theme.palette.primary.main} name="Primary Main" hex="#1e3a5f" />
            <ColorSwatch color={theme.palette.primary.light} name="Primary Light" hex="#2d4a6f" />
            <ColorSwatch color={theme.palette.primary.dark} name="Primary Dark" hex="#0f2340" />

            {/* Secondary Colors */}
            <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Secondary Colors
              </Typography>
            </Grid>
            <ColorSwatch color={theme.palette.secondary.main} name="Secondary Main" hex="#f5a847" />
            <ColorSwatch color={theme.palette.secondary.light} name="Secondary Light" hex="#f7b965" />
            <ColorSwatch color={theme.palette.secondary.dark} name="Secondary Dark" hex="#d89030" />

            {/* Accent Colors */}
            <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Accent Colors
              </Typography>
            </Grid>
            <ColorSwatch color="#ed5a9f" name="Accent Pink" hex="#ed5a9f" />
            <ColorSwatch color="#9b7ddb" name="Accent Purple" hex="#9b7ddb" />
            <ColorSwatch color="#f5c347" name="Accent Yellow" hex="#f5c347" textColor="dark" />

            {/* Background Colors */}
            <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Background Colors
              </Typography>
            </Grid>
            <ColorSwatch color="#ffffff" name="White" hex="#ffffff" textColor="dark" border />
            <ColorSwatch color="#f9e6b8" name="Cream" hex="#f9e6b8" textColor="dark" />
          </Grid>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <Stack spacing={3}>
            <Box>
              <Typography variant="h1" gutterBottom>
                Heading 1 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2.5rem / 600 weight / 0.02em letter-spacing
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" gutterBottom>
                Heading 2 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2rem / 600 weight / 0.02em letter-spacing
              </Typography>
            </Box>

            <Box>
              <Typography variant="h3" gutterBottom>
                Heading 3 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1.5rem / 500 weight / 0.01em letter-spacing
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Heading 4 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1.25rem / 500 weight
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom>
                Heading 5 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1.125rem / 500 weight
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Heading 6 - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1rem / 500 weight / uppercase / 0.1em letter-spacing
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" gutterBottom>
                Body 1 - Our global network offers solidarity and practical resources—linking experts, institutions, and
                the women we seek to help to provide holistic care and meaningful guidance for women wherever they are.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1rem / 400 weight / 1.6 line-height
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" gutterBottom>
                Body 2 - Our global network offers solidarity and practical resources—linking experts, institutions, and
                the women we seek to help to provide holistic care and meaningful guidance for women wherever they are.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                0.875rem / 400 weight / 1.5 line-height
              </Typography>
            </Box>

            <Box>
              <Typography variant="button" component="div" gutterBottom>
                Button Text - Learn More
              </Typography>
              <Typography variant="caption" color="text.secondary">
                0.875rem / 600 weight / uppercase / 0.05em letter-spacing
              </Typography>
            </Box>
          </Stack>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Primary Buttons
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="contained" color="primary">
                  Primary Button
                </Button>
                <Button variant="contained" color="primary" size="large">
                  Large Button
                </Button>
                <Button variant="contained" color="primary" size="small">
                  Small Button
                </Button>
                <Button variant="contained" color="primary" disabled>
                  Disabled
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Secondary Buttons
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="contained" color="secondary">
                  Secondary Button
                </Button>
                <Button variant="contained" color="secondary" size="large">
                  Large Button
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Small Button
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Outlined Buttons
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="outlined" color="primary">
                  Outlined Button
                </Button>
                <Button variant="outlined" color="secondary">
                  Secondary Outlined
                </Button>
                <Button variant="outlined" color="primary" disabled>
                  Disabled
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Text Buttons
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="text" color="primary">
                  Text Button
                </Button>
                <Button variant="text" color="secondary">
                  Secondary Text
                </Button>
                <Button variant="text" color="primary" disabled>
                  Disabled
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                CTA Button (Custom)
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#1e1e1e',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#2d2d2d',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Learn About Our Communities
              </Button>
            </Box>
          </Stack>
        </Section>

        {/* Circle Cards */}
        <Section title="Circle Cards">
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CircleCard
                bgcolor="primary.main"
                title="Real conversations"
                description="In safe, judgment-free forums"
                textColor="white"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CircleCard
                bgcolor="#ed5a9f"
                title="Expert insights"
                description="From healthcare professionals who understand women's needs"
                textColor="white"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CircleCard
                bgcolor="#9b7ddb"
                title="Curated resources"
                description="To help you make confident, informed decisions"
                textColor="white"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CircleCard
                bgcolor="#f5c347"
                title="Community support"
                description="From others who truly get what you're going through"
                textColor="#2d2d2d"
              />
            </Grid>
          </Grid>
        </Section>

        {/* Section Backgrounds */}
        <Section title="Section Backgrounds">
          <Stack spacing={4}>
            <Box
              sx={{
                bgcolor: 'background.cream',
                p: 6,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                WHAT YOU'LL FIND:
              </Typography>
              <Typography variant="body1">
                Our global network offers solidarity and practical resources—linking experts, institutions, and the
                women we seek to help to provide holistic care and meaningful guidance for women wherever they are.
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 6,
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                WHY WHWS™?
              </Typography>
              <Typography variant="body1">
                Health equity as an economic imperative — When women lack access to holistic support, their health,
                leadership, and potential are compromised.
              </Typography>
            </Box>
          </Stack>
        </Section>

        {/* Cards & Elevation */}
        <Section title="Cards & Elevation">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Elevation 0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flat card with border
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Elevation 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Subtle shadow
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Elevation 4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    More prominent shadow
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Section>

        {/* Spacing Scale */}
        <Section title="Spacing Scale">
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((space) => (
              <Box key={space} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ minWidth: 120, fontFamily: 'monospace' }}>
                  spacing({space})
                </Typography>
                <Box
                  sx={{
                    width: `${space * 8}px`,
                    height: 24,
                    bgcolor: 'secondary.main',
                    borderRadius: 1,
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                  {space * 8}px
                </Typography>
              </Box>
            ))}
          </Stack>
        </Section>
      </Container>
    </Box>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function ColorSwatch({
  color,
  name,
  hex,
  textColor = 'light',
  border = false,
}: {
  color: string;
  name: string;
  hex: string;
  textColor?: 'light' | 'dark';
  border?: boolean;
}) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 0,
          overflow: 'hidden',
          borderRadius: 2,
          border: border ? '1px solid #e0e0e0' : 'none',
        }}
      >
        <Box
          sx={{
            height: 120,
            bgcolor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: textColor === 'light' ? 'white' : '#2d2d2d',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: border ? '1px solid #e0e0e0' : 'none',
          }}
        >
          {hex}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            {hex}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

function CircleCard({
  bgcolor,
  title,
  description,
  textColor,
}: {
  bgcolor: string;
  title: string;
  description: string;
  textColor: string;
}) {
  return (
    <Box
      sx={{
        width: 280,
        height: 280,
        borderRadius: '50%',
        bgcolor,
        color: textColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
        {description}
      </Typography>
    </Box>
  );
}
