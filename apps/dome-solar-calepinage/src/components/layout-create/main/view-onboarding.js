import React, { useCallback } from 'react';
import { Stack, Typography, Box, Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../../contexts/useStore';

function Onboarding() {
  const store = useStore();
  const { sethasConfirmedOnBoarding, closeDialog } = store;

  const handleGotItButtonClick = useCallback(() => {
    closeDialog();
    sethasConfirmedOnBoarding(true);
  }, [closeDialog, sethasConfirmedOnBoarding]);

  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        bgcolor: 'grey.800',
        p: 3,
      }}
      alignItems={store.hasRequiredInfos() ? 'flex-end' : 'stretch'}
    >
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 4,
          borderRadius: 2,
        }}
      >
        {!store.hasRequiredInfos() ? (
          <Stack direction="row" spacing={3}>
            <Typography variant="h1">👆</Typography>
            <Box>
              <Typography variant="h3">1. Lier vos données</Typography>
              <Typography variant="body">
                Afin de créer un calepinage, vous devez lier les informations
                requises
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Stack width={230} spacing={2}>
            <Box>
              <Typography variant="h1">👉</Typography>
              <Typography variant="h3">2. Dessinez votre calepinage</Typography>
            </Box>
            <Typography variant="body">
              Vous pouvez modifier les paramètres du calepinage ici
            </Typography>
            <Button onClick={handleGotItButtonClick} variant="outlined">
              C&apos;est parti
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

export default observer(Onboarding);
