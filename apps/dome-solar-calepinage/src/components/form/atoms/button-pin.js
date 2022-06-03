import React from 'react';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ButtonBase from './button-base';

function ButtonPin(props) {
  const { tooltip = 'pin', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<PushPinOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonPin;
