import React from 'react';
import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const SideRoof = () => {
  const { register } = useForm();
  return (
    <Stack spacing={1}>
      <TextField
        label="Tx"
        size="small"
        type="number"
        fullWidth
        {...register('Tx')}
      />
      <TextField
        label="Ty"
        size="small"
        type="number"
        fullWidth
        {...register('Ty')}
      />
    </Stack>
  );
};

export default SideRoof;
