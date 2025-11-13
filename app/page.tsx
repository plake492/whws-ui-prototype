import React from 'react';
import CicleIcon from '@/components/CircleIcon';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';

const data = [
  { icon: 'chat', text: 'Hello' },
  { icon: 'community', text: 'how are ' },
  { icon: 'health', text: 'You' },
];

export default function App() {
  return (
    <>
      <Box className="hero" sx={{ py: 10, textAlign: 'center' }}>
        <Container>
          <Typography variant="h1" gutterBottom>
            Supporting Women's <span className="accent">Health</span> & Wellness
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Advocacy, education, and community — brought together to improve lifelong outcomes.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Learn how to get involved
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Explore communities
            </Button>
          </Box>
        </Container>
      </Box>

      <Stack alignItems={'center'}>
        <CicleIcon data={data} />
      </Stack>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>
          What You'll Find
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: 'Menopause', desc: 'Guides, care navigation, and community.' },
            { title: 'Cardiovascular', desc: 'Risk awareness and prevention.' },
            { title: 'Mental Health', desc: 'Support, stigma reduction, access.' },
            { title: 'Aging Well', desc: 'Resources to thrive in place.' },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
              <Paper elevation={1} className="tile" sx={{ p: '24px' }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.desc}</Typography>
                <Button size="small" color="primary" sx={{ mt: 1 }}>
                  Browse resources →
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box className="footer">
        <Typography variant="body2">© 2025 WHWS Inspired UI Demo</Typography>
      </Box>
    </>
  );
}
