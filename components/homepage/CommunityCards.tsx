'use client';

import { Box, Container, Typography, Button, Card, CardContent, Chip, Grid, CardMedia, Stack } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Community } from '@/types';

interface CommunityCardsProps {
  communities: Community[];
}

// Community Cards Section - Asymmetric Layout
const CommunityCards = ({ communities }: CommunityCardsProps) => {
  console.log(communities);
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
          {communities
            .filter((_, i) => i < 4)
            .map((community) => (
              <Grid size={{ xs: 12, md: 6 }} key={community.id}>
                <CommunityCard community={community} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

const CommunityCard = ({ community }: { community: Community }) => {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiCardMedia-root': {
          transition: 'transform 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Stack direction={'row'} sx={{ height: '100%' }}>
        <CardMedia sx={{ width: 240, overflow: 'hidden' }} image={community.coverImage || ''} title={community.name} />
        <CardContent
          sx={{
            p: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 90%)`,
            flex: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            {community.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
            {community.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label={`${community.members || 0} members`} color="secondary" size="medium" />
            <Button endIcon={<ArrowForward />} sx={{ ml: 'auto' }}>
              Join
            </Button>
          </Box>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default CommunityCards;
