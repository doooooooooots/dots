import React from 'react';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ButtonBase from './button-base';

function ButtonComment(props) {
  const { tooltip = 'comment', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<ChatOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonComment;
