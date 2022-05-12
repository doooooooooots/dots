import { Box, Stack, IconButton, TextField } from '@mui/material';
import React from 'react';
import { setValue } from '../../_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import ClearIcon from '@mui/icons-material/Clear';

export default function FilterExpansion(props) {
  const dispatch = useDispatch();
  const { expansionIn } = useSelector((state) => state.filter);

  const handleChange = (e) => {
    dispatch(setValue('expansionIn', e.target.value));
  };

  const handleReset = () => {
    dispatch(setValue('expansionIn', ''));
  };

  return (
    <Stack direction='row' alignItems='center' spacing={1} {...props}>
      <Box>
        <IconButton aria-label='delete' onClick={handleReset} sx={{ border: 1, borderColor: 'divider' }}>
          <ClearIcon fontSize='inherit' />
        </IconButton>
      </Box>
      <TextField
        value={expansionIn}
        onChange={handleChange}
        fullWidth
        placeholder='Filter par extension (bugs possibles)'
      />
    </Stack>
  );
}
