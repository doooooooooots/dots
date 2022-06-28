import React from 'react';
import ButtonPopper from './button-popper';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import InputSelect from './input-enum';

function ButtonEnum(props) {
  const { tooltip = 'enum', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonPopper
      label={count}
      tooltip={tooltip}
      startIcon={<BugReportOutlinedIcon />}
      variant={variant}
    >
      <InputSelect options="areaSea" />
    </ButtonPopper>
  );
}

export default ButtonEnum;
