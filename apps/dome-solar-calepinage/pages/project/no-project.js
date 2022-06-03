import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

function NoProject() {
  const router = useRouter();
  return (
    <Stack alignItems="center" justifyContent="center" padding={3} spacing={2}>
      <Box textAlign="center">
        <Typography variant="h1">Hello</Typography>
        <Typography variant="body">
          Il n&apos;y a pas encore de donnée
        </Typography>
      </Box>
      <Button variant="outlined" onClick={() => router.push('/project/create')}>
        Ajouter un projet
      </Button>
    </Stack>
  );
}

export default NoProject;
