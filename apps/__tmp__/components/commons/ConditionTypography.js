import { Typography } from '@mui/material';
import React from 'react';

function ConditionTypography(props) {
  const { variant = 'h4', condition, sx = {}, ...other } = props;
  let width, padding, borderRadius;

  switch (variant) {
    case 'caption':
      padding = (theme) => `${theme.spacing(0.1)} ${theme.spacing(1)}`;
      borderRadius = 1.5;
      break;
    case 'body1':
    case 'body2':
      padding = (theme) => `${theme.spacing(0.1)} ${theme.spacing(1)}`;
      borderRadius = 1.5;
      break;
    case 'h4':
      padding = (theme) => `${theme.spacing(0.2)} ${theme.spacing(3)}`;
      break;
    default:
      break;
  }
  return (
    <Typography
      variant={variant}
      textAlign='center'
      fontWeight='bold'
      sx={{
        backgroundColor: `condition.${condition}`,
        p: padding || 1,
        color: '#fff',
        borderRadius: borderRadius || 3,
        ...(width ? { width } : {}),
        ...sx
      }}
      {...other}
    >
      {condition}
    </Typography>
  );
}

export default React.memo(ConditionTypography);
