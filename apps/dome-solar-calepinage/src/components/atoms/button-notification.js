import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ButtonBase from './button-base';

function ButtonNotification(props) {
  const { tooltip = 'notification', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<NotificationsNoneOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonNotification;
