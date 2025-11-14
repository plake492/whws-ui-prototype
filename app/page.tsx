'use client';

import CicleIcon from '@/components/CircleIcon';
import ChatBotMinimal from '@/components/ChatBotMinimal';
import Header from '@/components/Header';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const data: { icon: 'chat' | 'community' | 'health'; text: string }[] = [
  { icon: 'chat', text: 'Knowledge' },
  { icon: 'community', text: 'Community' },
  { icon: 'health', text: 'Health & Wellness' },
];

export default function App() {
  return (
    <>
      <Header />
      <Box className="hero" sx={{ py: 10, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Image
          src={
            'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D '
          }
          fill
          alt=""
          style={{
            objectFit: 'cover',
            objectPosition: 'right',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box>
            <Typography variant="h1" gutterBottom>
              Supporting Women's <span className="accent">Health</span> & Wellness
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Advocacy, education, and community — brought together to improve lifelong outcomes.
            </Typography>
          </Box>
          <Stack alignItems={'center'} sx={{ my: 8, height: '500px' }}>
            <CicleIcon data={data} />
          </Stack>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Learn how to get involved
            </Button>
            <Button variant="outlined" color="primary" size="large" component={Link} href="/communities">
              Explore communities
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>
          What You'll Find
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: 'Menopause',
              desc: 'Guides, care navigation, and community.',
              image: 'https://picsum.photos/800/600',
            },
            { title: 'Cardiovascular', desc: 'Risk awareness and prevention.', image: 'https://picsum.photos/800/600' },
            {
              title: 'Mental Health',
              desc: 'Support, stigma reduction, access.',
              image: 'https://picsum.photos/800/600',
            },
            { title: 'Aging Well', desc: 'Resources to thrive in place.', image: 'https://picsum.photos/800/600' },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
              <Paper
                elevation={1}
                className="tile"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image src={item.image} fill alt="" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </Box>
                <Box sx={{ p: '24px' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">{item.desc}</Typography>
                  </Box>
                  <Button size="small" color="primary" sx={{ mt: 2, p: 0, ml: 'auto' }}>
                    Browse resources →
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={({ palette }) => ({
          backgroundColor: palette.accent.yellow,
          height: '400px',
          display: 'grid',
          placeContent: 'center',
        })}
      >
        <Typography variant="h1">THIS IS A BLOCK</Typography>
      </Box>

      <ChatBotMinimal />

      <Box sx={{ backgroundColor: '#333333', color: '#eeeeee', p: 4 }} component="footer">
        <Typography variant="body2">© 2025 WHWS Inspired UI Demo</Typography>
      </Box>
    </>
  );
}
