import React from 'react';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import ButtonBase from './button-base';

function ButtonHistory(props) {
  const { tooltip = 'history', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<ScheduleOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonHistory;
