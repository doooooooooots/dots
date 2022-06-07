import React from 'react';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ButtonBase from './button-base';

function ButtonComment(props) {
  const { tooltip = 'comment', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<ChatOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonComment;
