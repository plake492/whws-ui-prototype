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
  AppBar,
  Toolbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ==================== THEME SETUP ====================

type ThemeChoice = 'plumGold' | 'sageNavy';

interface ThemeContextType {
  currentTheme: ThemeChoice;
  setCurrentTheme: (theme: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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
      contrastText: '#1f2f3a',
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

const createAppTheme = (paletteChoice: ThemeChoice) => {
  const palette = palettes[paletteChoice];

  return createTheme({
    palette,
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: '7rem',
        fontWeight: 900,
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        '@media (max-width:1200px)': {
          fontSize: '5rem',
        },
        '@media (max-width:768px)': {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '4.5rem',
        fontWeight: 900,
        lineHeight: 1.1,
        '@media (max-width:1200px)': {
          fontSize: '3.5rem',
        },
        '@media (max-width:768px)': {
          fontSize: '2.5rem',
        },
      },
      h3: {
        fontSize: '2.2rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '4rem',
        fontWeight: 900,
        lineHeight: 1.1,
        '@media (max-width:1200px)': {
          fontSize: '3rem',
        },
      },
      h5: {
        fontSize: '5.5rem',
        fontWeight: 900,
        lineHeight: 1.1,
        '@media (max-width:1200px)': {
          fontSize: '4rem',
        },
        '@media (max-width:768px)': {
          fontSize: '2.8rem',
        },
      },
      body1: {
        fontSize: '1.4rem',
        lineHeight: 1.7,
        '@media (max-width:768px)': {
          fontSize: '1.1rem',
        },
      },
      body2: {
        fontSize: '1.2rem',
        lineHeight: 1.7,
      },
    },
  });
};

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

const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return context;
};

// ==================== STYLED COMPONENTS ====================

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: 100,
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const HeroGrid = styled(Box)(({ theme }) => ({
  maxWidth: 1600,
  margin: '0 auto',
  padding: '80px 60px',
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: 80,
  alignItems: 'center',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
    padding: '40px 20px',
    gap: 40,
  },
}));

interface DecorativeCircleProps {
  size: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  opacity?: number;
}

const DecorativeCircle: React.FC<DecorativeCircleProps> = ({ size, top, right, bottom, left, opacity = 0.1 }) => (
  <Box
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `rgba(255, 255, 255, ${opacity})`,
      top,
      right,
      bottom,
      left,
    }}
  />
);

const StatsCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 50,
  borderRadius: 40,
  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  position: 'relative',
}));

const StatItem = styled(Box)({
  marginBottom: 35,
  '&:last-child': {
    marginBottom: 0,
  },
});

const CommunitiesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 40,
  maxWidth: 1600,
  margin: '0 auto',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
  },
}));

const CommunityCard = styled(Box)<{ offset?: boolean }>(({ theme, offset }) => ({
  background: theme.palette.background.default,
  padding: 60,
  borderRadius: 50,
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transform: offset ? 'translateY(60px)' : 'translateY(0)',
  '&:hover': {
    transform: offset ? 'translateY(50px)' : 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
  },
  '@media (max-width:768px)': {
    padding: 40,
    transform: 'translateY(0)',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
}));

const SplitSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '@media (max-width:768px)': {
    gridTemplateColumns: '1fr',
  },
  backgroundColor: theme.palette.primary.main,
}));

const ChatDemo = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 40,
  borderRadius: 40,
  width: '100%',
  maxWidth: 600,
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
}));

// ==================== COMPONENTS ====================

const Navigation = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
        <Toolbar sx={{ py: 3, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: '1.75rem',
              color: 'text.secondary',
              letterSpacing: '-0.5px',
            }}
          >
            WHWS™
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
            <Button sx={{ fontWeight: 500, fontSize: '1rem', color: 'text.primary' }}>Communities</Button>
            <Button sx={{ fontWeight: 500, fontSize: '1rem', color: 'text.primary' }}>Resources</Button>
            <Button sx={{ fontWeight: 500, fontSize: '1rem', color: 'text.primary' }}>About</Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '30px',
                px: 4,
                py: 1.75,
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              Join Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

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

const Communities = () => {
  const communities = [
    {
      title: 'Menopause Support',
      description: 'Navigate physical and emotional transitions with confidence and clarity.',
      icon: '🌸',
      members: '12,400',
    },
    {
      title: 'Heart Health',
      description: 'Strengthen cardiovascular health with personalized strategies and peer support.',
      icon: '❤️',
      members: '8,200',
    },
    {
      title: 'Mental Wellness',
      description: 'Connect with compassionate peers and evidence-based tools for resilience.',
      icon: '🧠',
      members: '15,600',
    },
    {
      title: 'Aging Well',
      description: 'Empower your journey to age gracefully, safely, and independently at home.',
      icon: '🏡',
      members: '6,900',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 18 }, px: { xs: 2, md: 8 } }}>
      <Container maxWidth={false} disableGutters>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'secondary.main',
            mb: 2.5,
          }}
        >
          Find Your Space
        </Typography>
        <Typography variant="h2" color="primary" sx={{ mb: 10, maxWidth: 900 }}>
          Supportive communities designed by women, for women
        </Typography>

        <CommunitiesGrid>
          {communities.map((community, index) => (
            <CommunityCard key={index} offset={index % 2 === 1}>
              <Box sx={{ fontSize: '4rem', mb: 3.5 }}>{community.icon}</Box>
              <Typography variant="h3" color="primary" sx={{ mb: 2.5 }}>
                {community.title}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 3.5 }}>
                {community.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    px: 3,
                    py: 1.5,
                    borderRadius: '25px',
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '1rem',
                  }}
                >
                  {community.members} members
                </Box>
                <Box
                  sx={{
                    ml: 'auto',
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  →
                </Box>
              </Box>
            </CommunityCard>
          ))}
        </CommunitiesGrid>
      </Container>
    </Box>
  );
};

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
              transform: 'translateY(-3px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
            },
          }}
        >
          Try AI Chat
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 4, md: 10 },
          borderBottomLeftRadius: '40px',
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
    </SplitSection>
  );
};

const BigCTA = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        py: { xs: 12, md: 22 },
        px: { xs: 3, md: 8 },
        textAlign: 'center',
        color: 'primary.contrastText',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecorativeCircle size={700} top={-300} right={-300} opacity={0.05} />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Typography variant="h5" sx={{ mb: 5, color: 'primary.contrastText' }}>
          Ready to take control?
        </Typography>
        <Typography
          sx={{
            fontSize: '1.5rem',
            mb: 7.5,
            opacity: 0.95,
            color: 'primary.contrastText',
          }}
        >
          Join thousands of women who have found support, guidance, and community at WHWS.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: 'background.paper',
              color: 'primary.main',
              borderRadius: '35px',
              px: 6.25,
              py: 2.75,
              fontSize: '1.2rem',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              },
            }}
          >
            Create Free Account
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'primary.contrastText',
              color: 'primary.contrastText',
              borderRadius: '35px',
              borderWidth: 2,
              px: 6.25,
              py: 2.75,
              fontSize: '1.2rem',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'background.paper',
                color: 'primary.main',
                borderWidth: 2,
                borderColor: 'background.paper',
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

const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme } = useAppTheme();

  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
      <ToggleButtonGroup
        value={currentTheme}
        exclusive
        onChange={(e, value) => value && setCurrentTheme(value)}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 8,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        }}
      >
        <ToggleButton
          value="plumGold"
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Plum + Gold
        </ToggleButton>
        <ToggleButton
          value="sageNavy"
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Sage + Navy
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

// ==================== MAIN PAGE COMPONENT ====================

const WHWSLandingPage = () => {
  return (
    <AppThemeProvider>
      <Box sx={{ minHeight: '100vh' }}>
        <Navigation />
        <Hero />
        <Communities />
        <AIChatSection />
        <BigCTA />
        <ThemeSwitcher />
      </Box>
    </AppThemeProvider>
  );
};

export default WHWSLandingPage;
