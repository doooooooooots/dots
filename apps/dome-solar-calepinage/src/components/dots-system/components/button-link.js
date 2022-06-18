import React from 'react';
import ButtonPopper from './button-popper';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import InputLink from './input-enum';

function ButtonEnum(props) {
  const { tooltip = 'link', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonPopper
      label={count}
      tooltip={tooltip}
      startIcon={<BugReportOutlinedIcon />}
      variant={variant}
    >
      <InputLink entity="Person" />
    </ButtonPopper>
  );
}

export default ButtonEnum;
