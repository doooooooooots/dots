import React from 'react';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from '_trash/store/store';
import { reset } from '../../_trash/slices/filter';

export default function ButtonFilterReset() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <IconButton color='primary' aria-label='reset filter' component='span' onClick={handleReset}>
      <ReplayIcon />
    </IconButton>
  );
}
