import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function StyledDetailsItem(props) {
  const { title, primary, onClick } = props;
  return (
    <Box>
      <Typography variant='caption'>{title}</Typography>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          '& .MuiIconButton-root': {
            visibility: 'hidden'
          },
          '&:hover .MuiIconButton-root': {
            visibility: 'visible'
          }
        }}
      >
        <Typography variant='body1' fontWeight='bold'>
          {primary}
        </Typography>
        <IconButton edge='end' aria-label='edit' onClick={onClick}>
          <EditOutlinedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
