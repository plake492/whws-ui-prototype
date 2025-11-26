'use client';

import React, { useState, createContext, useContext } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Chip,
  Avatar,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Fab,
} from '@mui/material';

import { Menu as MenuIcon, Favorite, Chat, Person, Search, ArrowForward, CheckCircle } from '@mui/icons-material';

// Theme Context
type ThemeChoice = 'plumGold' | 'sageNavy';

interface ThemeContextType {
  currentTheme: ThemeChoice;
  setCurrentTheme: (theme: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color Palettes
const palettes = {
  plumGold: {
    primary: {
      main: '#5D3A6C',
      light: '#8B6B9C',
      dark: '#4a2e56',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D4A574',
      light: '#E5C5A0',
      dark: '#c69564',
      contrastText: '#2c3e50',
    },
    background: {
      default: '#F5EDE3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5D3A6C',
    },
  },
  sageNavy: {
    primary: {
      main: '#2C4251',
      light: '#4a6170',
      dark: '#1f2f3a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7A9B8E',
      light: '#A8C5B9',
      dark: '#6a8a7d',
      contrastText: '#fff',
    },
    background: {
      default: '#F7F9F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#2C4251',
    },
  },
};

// Create MUI Theme
const createAppTheme = (paletteChoice: ThemeChoice) => {
  const palette = palettes[paletteChoice];

  return createTheme({
    palette,
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      },
    },
    shape: {
      borderRadius: 24, // Large border radius as requested
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 28,
            padding: '14px 32px',
            fontSize: '1.05rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
          sizeLarge: {
            padding: '18px 40px',
            fontSize: '1.125rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 32,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 24,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 16,
              fontSize: '1.05rem',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontSize: '0.95rem',
            padding: '8px 4px',
          },
        },
      },
    },
  });
};

// Theme Provider Component
const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeChoice>('plumGold');
  const theme = createAppTheme(currentTheme);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return context;
};

// Theme Switcher Component
const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme } = useAppTheme();

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      <ToggleButtonGroup
        value={currentTheme}
        exclusive
        onChange={(e, value) => value && setCurrentTheme(value)}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        <ToggleButton value="plumGold" sx={{ px: 3, py: 1.5 }}>
          Plum + Gold
        </ToggleButton>
        <ToggleButton value="sageNavy" sx={{ px: 3, py: 1.5 }}>
          Sage + Navy
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        <Toolbar sx={{ py: 2 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            WHWS™
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Button color="inherit">Communities</Button>
            <Button color="inherit">Resources</Button>
            <Button color="inherit">About</Button>
            <Button variant="contained" color="primary">
              Join Now
            </Button>
          </Box>
          <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Hero Section - Full Screen, Interesting Layout
const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: -200,
          right: -200,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          bottom: -100,
          left: -100,
        }}
      />

      <Container maxWidth={false} sx={{ px: { xs: 3, md: 8 }, position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white' }}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Your Health Journey, Your Community
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.25rem',
                  opacity: 0.95,
                  maxWidth: 550,
                }}
              >
                Connect with women who understand your experience. Get AI-powered support, expert guidance, and a
                community that's here for you every step of the way.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                  endIcon={<ArrowForward />}
                >
                  Explore Communities
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
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 8,
                p: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
                Quick Stats
              </Typography>
              <Grid container spacing={3}>
                {[
                  { number: '1.3M+', label: 'Women enter menopause yearly' },
                  { number: '45%', label: 'Women with cardiovascular disease' },
                  { number: '27%', label: 'Experience mental health challenges' },
                ].map((stat, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ color: 'white' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Community Cards Section - Asymmetric Layout
const CommunityCards = () => {
  const communities = [
    {
      title: 'Menopause Support',
      description: 'Navigate physical and emotional transitions with confidence and clarity.',
      icon: '🌸',
      members: '12,400',
      color: '#FF6B9D',
    },
    {
      title: 'Heart Health',
      description: 'Strengthen cardiovascular health with personalized strategies and peer support.',
      icon: '❤️',
      members: '8,200',
      color: '#FF4757',
    },
    {
      title: 'Mental Wellness',
      description: 'Connect with compassionate peers and evidence-based tools for resilience.',
      icon: '🧠',
      members: '15,600',
      color: '#5F27CD',
    },
    {
      title: 'Aging Well',
      description: 'Empower your journey to age gracefully, safely, and independently at home.',
      icon: '🏡',
      members: '6,900',
      color: '#00D2D3',
    },
  ];

  return (
    <Box sx={{ py: 12, px: { xs: 3, md: 8 } }}>
      <Container maxWidth={false}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'text.secondary' }}>
            Find Your Community
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.primary' }}>
            Join supportive spaces designed by women, for women—where your experiences are valued and your health
            journey is the priority.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {communities.map((community, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      mb: 3,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                    }}
                  >
                    {community.icon}
                  </Box>
                  <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>
                    {community.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
                    {community.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label={`${community.members} members`} color="secondary" size="medium" />
                    <Button endIcon={<ArrowForward />} sx={{ ml: 'auto' }}>
                      Join
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// AI Chat Preview Section - Full Width Split
const AIChatSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        py: 12,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 3, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 3, color: 'text.secondary' }}>
              AI-Powered Support, Always Here
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
              Get instant, personalized guidance on health topics that matter to you. Our AI assistant is trained on
              trusted medical sources and understands the nuances of women's health at every stage.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              {[
                'HIPAA-compliant and secure',
                'Evidence-based medical information',
                'Available 24/7 for your questions',
                'Personalized to your health journey',
              ].map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle color="secondary" sx={{ fontSize: 28 }} />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Box>
            <Button variant="contained" size="large" color="primary">
              Try AI Chat
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  Ask anything about your health
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Example: I'm experiencing hot flashes that are affecting my sleep. What can I do to manage them better?"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Responses in seconds
                </Typography>
                <Button variant="contained" color="secondary">
                  Send
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

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
            <Grid item xs={12} md={4} key={index}>
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

// Main App Component
const WHWSUIKit = () => {
  return (
    <AppThemeProvider>
      <Box sx={{ minHeight: '100vh' }}>
        <Navigation />
        <HeroSection />
        <CommunityCards />
        <AIChatSection />
        <TestimonialsSection />
        <CTASection />
        <ThemeSwitcher />
      </Box>
    </AppThemeProvider>
  );
};

export default WHWSUIKit;
