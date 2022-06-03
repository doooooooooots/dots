import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ButtonBase from './button-base';

function ButtonNotification(props) {
  const { tooltip = 'notification', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<NotificationsNoneOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonNotification;
