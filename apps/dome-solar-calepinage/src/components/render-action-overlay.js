import React from 'react';
import { alpha, Box, Stack, Typography, Button } from '@mui/material';
import { useStore } from './context/useStore';
import { useFormContext } from 'react-hook-form';
import { SIDEBAR_WIDTH } from '../constants/constants';

function RenderActionOverlay() {
  const store = useStore();

  const { handleSubmit } = useFormContext();

  const onSubmit = (data) => {
    Object.entries(data).map(([key, value]) => {
      if (value) {
        store.setUserData(key, value);
      }
    });
    store.renderView();
  };

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={SIDEBAR_WIDTH}
      height="100%"
      backgroundColor={(theme) => alpha(theme.palette.neutralTints[700], 0.5)}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        p={3}
        spacing={2}
        backgroundColor="background.default"
        borderRadius={1}
        boxShadow={(theme) => theme.shadows[10]}
      >
        <Typography variant="h6">You need to render</Typography>
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          Render
        </Button>
      </Stack>
    </Box>
  );
}

export default RenderActionOverlay;
