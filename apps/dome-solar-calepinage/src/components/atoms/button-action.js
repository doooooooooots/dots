import React from 'react';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import ButtonBase from './button-base';

function ButtonAction(props) {
  const { tooltip = 'action', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<FlashOnOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonAction;
