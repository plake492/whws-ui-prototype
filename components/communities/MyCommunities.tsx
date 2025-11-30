'use client';

import { Typography, Grid, Box, Stack } from '@mui/material';

const MyCommunities = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '90dvh',
        backgroundColor: 'background.default',
        borderRadius: '12px',
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 6, fontWeight: 600 }}>
        My Communities
      </Typography>
      <Stack direction={'column'} gap={2}>
        {Array.from({ length: 5 }, (_, i) => (
          <Grid
            container
            key={i}
            sx={{
              borderWidth: 0.5,
              borderStyle: 'solid',
              borderColor: 'background.default',
              transition: 'border-color 200ms ease-in-out, bacground-color 250ms ease-in-out',
              borderRadius: '12px',
              pl: 2,
              pr: 4,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.light',
                backgroundColor: (theme) => `${theme.palette.primary.light}50`,
              },
            }}
          >
            <Grid>
              <Box>My community</Box>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export default MyCommunities;
