import React from 'react';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import ButtonBase from './button-base';

function ButtonAction(props) {
  const { tooltip = 'action', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<FlashOnOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonAction;
