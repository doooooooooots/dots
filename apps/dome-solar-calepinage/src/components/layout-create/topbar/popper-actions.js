import React from 'react';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function PopperTop(props) {
  const {
    title,
    HomeIcon = HomeOutlinedIcon,
    showBackButton,
    onClickHome,
    onClose,
    onClickBack,
  } = props;
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
      >
        <Stack direction="row" alignItems="center">
          {showBackButton ? (
            <IconButton onClick={onClickBack} size="small">
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton onClick={onClickHome} size="small">
              <HomeIcon fontSize="small" />
            </IconButton>
          )}
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Typography variant="h6">{title}</Typography>
        </Stack>

        <IconButton onClick={onClose} size="small">
          <CloseOutlinedIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />
    </>
  );
}

export default PopperTop;
