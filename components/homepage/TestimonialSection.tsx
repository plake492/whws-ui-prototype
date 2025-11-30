'use client';

import { Box, Container, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';

// Testimonials Section - Floating Cards
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      age: 54,
      text: 'This community has been a lifeline during my menopause journey. I finally feel understood.',
      avatar: 'S',
    },
    {
      name: 'Jennifer L.',
      age: 61,
      text: "The heart health resources and support have helped me make real changes. I'm so grateful.",
      avatar: 'J',
    },
    {
      name: 'Michelle K.',
      age: 48,
      text: 'Having instant access to reliable health information and supportive women has changed everything.',
      avatar: 'M',
    },
  ];

  return (
    <Box sx={{ py: 12, px: { xs: 3, md: 8 } }}>
      <Container maxWidth={false}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, color: 'text.secondary' }}>
          Stories from Our Community
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <CardContent sx={{ p: 4, pt: 6 }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: 'secondary.main',
                      color: 'secondary.contrastText',
                      fontSize: '1.75rem',
                      fontWeight: 600,
                      position: 'absolute',
                      top: -35,
                      left: 30,
                      border: '4px solid white',
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      color: 'text.primary',
                      fontSize: '1.1rem',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age {testimonial.age}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
