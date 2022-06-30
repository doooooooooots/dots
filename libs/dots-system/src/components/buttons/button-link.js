import React from 'react';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import ButtonPopper from './button-popper';
import InputRelationship from './input-relationship';

function ButtonRelationShip(props) {
  const { tooltip = 'link', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonPopper
      label={count}
      tooltip={tooltip}
      startIcon={<BugReportOutlinedIcon />}
      variant={variant}
    >
      <InputRelationship entity="Person" />
    </ButtonPopper>
  );
}

export default ButtonRelationShip;
