import { IconButton, Stack, TextField } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import React from 'react';

const fontSize = 35;
const iconSize = 33;

export default function InputNumber(props) {
  const { value, onChange, ...other } = props;

  const handleAdd = () => {
    onChange((parseInt(value) || 0) + 1);
  };
  const handleSubstract = () => {
    onChange((parseInt(value) || 0) - 1);
  };

  return (
    <Stack direction='row'>
      <IconButton onClick={handleSubstract}>
        <RemoveCircleOutlineOutlinedIcon
          sx={{
            fontSize: iconSize
          }}
        />
      </IconButton>
      <TextField
        value={value}
        onChange={onChange}
        InputProps={{
          sx: {
            fontSize: fontSize,
            '& input': { textAlign: 'center' }
          }
        }}
        variant='standard'
        {...other}
      />
      <IconButton onClick={handleAdd}>
        <AddCircleOutlineOutlinedIcon
          sx={{
            fontSize: iconSize
          }}
        />
      </IconButton>
    </Stack>
  );
}
