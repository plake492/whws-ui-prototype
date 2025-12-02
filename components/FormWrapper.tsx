import Logo from '@/components/Logo';
import { Box, Container, Paper } from '@mui/material';

const FormWrapper = ({ withLogo, children }: { withLogo?: boolean; children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        px: { xs: 0.5, md: 4 },
        py: 8,
        borderRadius: '40px',
        position: 'relative',
      }}
      className="primary-gradient"
    >
      {withLogo && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, mt: 8, ml: 10 }}>
          <Logo />
        </Box>
      )}
      <Container maxWidth="sm" sx={{ width: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default FormWrapper;
