import React from 'react';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import ButtonBase from './button-base';

function ButtonBug(props) {
  const { tooltip = 'bug', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<BugReportOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonBug;
