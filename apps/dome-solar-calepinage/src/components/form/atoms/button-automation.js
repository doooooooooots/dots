import React from 'react';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ButtonBase from './button-base';

function ButtonTag(props) {
  const { tooltip = 'automation', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<SmartToyOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonTag;
