import React from 'react';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { ucFirst } from '@dots.cool/utils';

function ButtonBase(props) {
  const {
    tooltip = '',
    icon,
    color = 'neutral',
    variant = 'standard',
    sx = {},
    children,
    ...other
  } = props;
  return (
    <Tooltip title={ucFirst(tooltip)}>
      <IconButton
        sx={[
          {
            minWidth: 40,
            '&, & .MuiTypography-root': {
              typography: 'body2',
              fontWeight: '500',
              color: `${color}.main`,
            },
          },
          variant === 'outlined' && {
            border: '1px solid',
            borderColor: `border.${color}`,
          },
          variant === 'contained' && {
            bgcolor: `${color}.main`,
            '&, & .MuiTypography-root': {
              color: `${color}.contrastText`,
            },
          },
          sx,
        ]}
        {...other}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {!!icon && icon}
          {typeof children !== 'undefined' && (
            <Typography>{children}</Typography>
          )}
        </Stack>
      </IconButton>
    </Tooltip>
  );
}

export default ButtonBase;
