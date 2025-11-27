'use client';

import { SplitSection, ChatDemo } from './StyledComponents';
import { Box, Typography, Button, TextField } from '@mui/material';
import Link from 'next/link';

// AI Chat Preview Section - Full Width Split
const AIChatSection = () => {
  return (
    <SplitSection>
      <Box
        sx={{
          p: { xs: 6, md: 15 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderTopRightRadius: '40px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 5, color: 'primary.contrastText' }}>
          AI-Powered Support, Always Here
        </Typography>
        <Typography sx={{ fontSize: '1.3rem', lineHeight: 1.8, mb: 5, opacity: 0.95 }}>
          Get instant, personalized guidance on health topics that matter to you. Our AI assistant is trained on trusted
          medical sources and understands the nuances of women's health at every stage.
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', mb: 6, pl: 0 }}>
          {[
            'HIPAA-compliant and secure',
            'Evidence-based medical information',
            'Available 24/7 for your questions',
            'Personalized to your health journey',
          ].map((feature, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                fontSize: '1.2rem',
                mb: 3,
                pl: 5,
                position: 'relative',
                '&:before': {
                  content: '"✓"',
                  position: 'absolute',
                  left: 0,
                  fontSize: '1.5rem',
                  color: 'secondary.main',
                  fontWeight: 'bold',
                },
              }}
            >
              {feature}
            </Box>
          ))}
        </Box>
        <Link href="/chat">
          <Button
            variant="contained"
            sx={{
              bgcolor: 'background.paper',
              color: 'primary.main',
              borderRadius: '35px',
              px: 5.5,
              py: 2.75,
              fontSize: '1.2rem',
              fontWeight: 700,
              alignSelf: 'flex-start',
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              },
            }}
          >
            Try AI Chat
          </Button>
        </Link>
      </Box>

      <Box sx={{ bgcolor: 'primary.main' }}>
        <Box
          sx={{
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 10 },
            borderBottomLeftRadius: '40px',
            height: '100%',
          }}
        >
          <ChatDemo>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
              }}
            >
              Ask anything about your health
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Example: I'm experiencing hot flashes that are affecting my sleep. What can I do to manage them better?"
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontSize: '1.1rem',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>Responses in seconds</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  borderRadius: '25px',
                  px: 4.5,
                  py: 1.875,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </ChatDemo>
        </Box>
      </Box>
    </SplitSection>
  );
  // return (
  //   <Box
  //     sx={{
  //       bgcolor: 'background.default',
  //       py: 12,
  //     }}
  //   >
  //     <Container maxWidth={false} sx={{ px: { xs: 3, md: 8 }, backgroundColor: 'primary.main' }}>
  //       <Grid container spacing={6} alignItems="center">
  //         <Grid size={{ xs: 12, md: 6 }}>
  //           <Typography variant="h2" sx={{ mb: 3, color: 'text.secondary' }}>
  //             AI-Powered Support, Always Here
  //           </Typography>
  //           <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
  //             Get instant, personalized guidance on health topics that matter to you. Our AI assistant is trained on
  //             trusted medical sources and understands the nuances of women's health at every stage.
  //           </Typography>
  //           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
  //             {[
  //               'HIPAA-compliant and secure',
  //               'Evidence-based medical information',
  //               'Available 24/7 for your questions',
  //               'Personalized to your health journey',
  //             ].map((feature, index) => (
  //               <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //                 <CheckCircle color="secondary" sx={{ fontSize: 28 }} />
  //                 <Typography variant="body1">{feature}</Typography>
  //               </Box>
  //             ))}
  //           </Box>
  //           <Button variant="contained" size="large" color="primary">
  //             Try AI Chat
  //           </Button>
  //         </Grid>
  //         <Grid size={{ xs: 12, md: 6 }}>
  //           <Paper
  //             elevation={0}
  //             sx={{
  //               p: 4,
  //               bgcolor: 'background.paper',
  //               border: '1px solid',
  //               borderColor: 'divider',
  //             }}
  //           >
  //             <Box sx={{ mb: 3 }}>
  //               <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
  //                 Ask anything about your health
  //               </Typography>
  //               <TextField
  //                 fullWidth
  //                 multiline
  //                 rows={4}
  //                 placeholder="Example: I'm experiencing hot flashes that are affecting my sleep. What can I do to manage them better?"
  //                 variant="outlined"
  //               />
  //             </Box>
  //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //               <Typography variant="body2" color="text.secondary">
  //                 Responses in seconds
  //               </Typography>
  //               <Button variant="contained" color="secondary">
  //                 Send
  //               </Button>
  //             </Box>
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   </Box>
  // );
};

export default AIChatSection;
