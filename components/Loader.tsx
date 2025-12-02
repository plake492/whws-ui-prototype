import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center', minHeight: '100dvh' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
