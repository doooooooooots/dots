import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import ProjectFormCreate from '../../src/components/layout-create/forms/project-create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProjectPageCreate() {
  const router = useRouter();

  return (
    <Box bgcolor="grey.100" minHeight="100vh" p={5}>
      <Container maxWidth="md" sx={{ bgcolor: 'background.default', p: 1 }}>
        <Stack>
          <Box>
            <Button
              size="small"
              color="neutral"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/')}
            >
              Retour
            </Button>
          </Box>
        </Stack>
        <Typography variant="h1" sx={{ mb: 5 }}>
          Créer un nouveau projet
        </Typography>
        <ProjectFormCreate />
      </Container>
    </Box>
  );
}

export default ProjectPageCreate;
