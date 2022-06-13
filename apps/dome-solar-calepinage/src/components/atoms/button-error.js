import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ButtonBase from './button-base';

function ButtonError(props) {
  const { tooltip = 'error', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<ErrorOutlineIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonError;
