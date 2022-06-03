import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ButtonBase from './button-base';

function ButtonTask(props) {
  const { tooltip = 'task', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<AssignmentOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonTask;
