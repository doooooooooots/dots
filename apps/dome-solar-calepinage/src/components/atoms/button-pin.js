import React from 'react';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ButtonBase from './button-base';

function ButtonPin(props) {
  const { tooltip = 'pin', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<PushPinOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonPin;
