import React from 'react';
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PopperGrowWithClickaway from './popper-grow-with-clickaway';
import { SearchOutlined } from '@mui/icons-material';
import { POPPER_SEARCH_PADDING } from '../constants/constants';

function PopperSearch(props) {
  const {
    label,
    open,
    anchorEl,
    onClose,
    loading,
    input,
    onChange,
    children,
    ...other
  } = props;

  return (
    <PopperGrowWithClickaway
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        p: 0,
        minWidth: 250,
      }}
      {...other}
    >
      <Stack pt={POPPER_SEARCH_PADDING} px={POPPER_SEARCH_PADDING} spacing={1}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          autoFocus
          variant="standard"
          value={input}
          onChange={onChange}
          sx={{
            bgcolor: 'neutral.background',
            borderRadius: 1,
            '& .MuiInput-root:before, & .MuiInput-root:after, & .MuiInput-root:hover:not(.Mui-disabled):before':
              {
                border: 0,
              },
          }}
          fullWidth
        />
        <Typography variant="caption" fontWeight={500} color="neutral.400">
          {label}
        </Typography>
      </Stack>
      {loading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          py={POPPER_SEARCH_PADDING}
        >
          <CircularProgress />
        </Stack>
      )}
      {!loading && children}
    </PopperGrowWithClickaway>
  );
}

export default PopperSearch;
