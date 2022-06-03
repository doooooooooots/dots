import React from 'react';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import ButtonBase from './button-base';

function ButtonBug(props) {
  const { tooltip = 'bug', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<BugReportOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonBug;
