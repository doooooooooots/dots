import React from 'react';
import { Button } from '@mui/material';

function ButtonBase(props) {
  const { variant, color, sx = {}, ...other } = props;

  return (
    <Button
      {...other}
      variant={variant}
      color={color}
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
        open && {
          bgcolor: `neutral.background`,
        },
        sx,
      ]}
    />
  );
}

export default ButtonBase;
