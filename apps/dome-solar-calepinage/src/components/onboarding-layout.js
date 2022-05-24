import React from 'react';
import { Stack, Typography, Box } from '@mui/material';

function OnboardingLayout() {
  return (
    <Stack
      sx={{
        height: '100%',
        bgcolor: 'grey.800',
        p: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 3,
          borderRadius: 2,
          ml: '200px',
        }}
      >
        <Stack direction="row" spacing={3}>
          <Typography variant="h1">👆</Typography>
          <Box>
            <Typography variant="h3">Bienvenue</Typography>
            <Typography variant="body">
              Vous avez besoin d&apos;indiquer au moins un modèle de panneau
              solaire et un produit pour pouvoir commencer à générer un
              calepinage
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default OnboardingLayout;
