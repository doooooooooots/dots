import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ButtonBase from './button-base';

function ButtonError(props) {
  const { tooltip = 'error', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<ErrorOutlineIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonError;
