import React from 'react';
import { Alert, Box, FormControl, InputLabel, ListItemIcon, MenuItem, Select, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorageBoxParams from '../step-1-params';

const StorageBoxWizardStep1 = () => {
  const onChange = () => {};
  const onChangeToggle = () => {};
  const filter = {};
  const expansions = {};

  return (
    <>
      <Alert severity='info' sx={{ mb: 4 }}>
        <Box component='span' sx={{ mr: 1 }}>
          🤖
        </Box>
        1. tu indiques les paramètres du rack
      </Alert>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id='demo-simple-select-label'>Type de raretés</InputLabel>
        <Select label='Type de raretés' value={filter?.sortLogicId} onChange={onChange('sortLogicId')}>
          <MenuItem value={0}>
            <ListItemIcon>✅</ListItemIcon>Commune &amp; Rare
          </MenuItem>
          <MenuItem value={1}>
            <ListItemIcon>❌ </ListItemIcon>Pas Commune &amp; PAS rare
          </MenuItem>
        </Select>
      </FormControl>
      <Stack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>
        {/* ---- FROM ---- */}
        <Box>
          <Typography variant='h6' gutterBottom>
            👉 Première extension du rack
          </Typography>
          <StorageBoxParams
            expansions={expansions}
            onChangeToggle={onChangeToggle}
            onChange={onChange}
            filter={filter}
            variant='from'
            label={'Première extension du rack'}
          />
        </Box>

        <Box textAlign='center'>
          <ArrowForwardIcon fontSize='large' />
        </Box>

        {/* ---- TO ---- */}
        <Box>
          <Typography variant='h6' gutterBottom>
            ✋ Dernière extension du rack
          </Typography>
          <StorageBoxParams
            expansions={expansions}
            onChangeToggle={onChangeToggle}
            onChange={onChange}
            filter={filter}
            variant='to'
            label={'Dernière extension du rack'}
          />
        </Box>
      </Stack>
    </>
  );
};

export default StorageBoxWizardStep1;
