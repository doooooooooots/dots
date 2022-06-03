import React from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ButtonBase from './button-base';

function ButtonIdea(props) {
  const { tooltip = 'idea', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<LightbulbOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonIdea;
