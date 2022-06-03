import CardModule from '../card-module';
import { useStore } from '../context/useStore';
import { PowerSettingsNewOutlined } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React from 'react';

function SideSelect() {
  const store = useStore();
  return (
    <Box backgroundColor="background.default">
      <Typography variant="h5" textAlign="center" my={2}>
        {store.allSelected().length} sélections
      </Typography>
      <Stack direction="row" justifyContent="center">
        <IconButton
          onClick={() => {
            store.setActiveAll(true);
          }}
          sx={{
            color: '#389cff',
            border: 1,
            mr: 1,
          }}
        >
          <PowerSettingsNewOutlined fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => {
            store.setActiveAll(false);
          }}
          sx={{
            color: '#b7b7b7',
            border: 1,
            mr: 1,
          }}
        >
          <PowerSettingsNewOutlined fontSize="small" />
        </IconButton>
        <Button onClick={store.resetSelected} variant="outlined">
          Terminer
        </Button>
      </Stack>
      <Stack spacing={1} p={1} mt={2}>
        {store.allSelected().map((index) => (
          <CardModule key={index} moduleIndex={index} />
        ))}
      </Stack>
    </Box>
  );
}

export default observer(SideSelect);
