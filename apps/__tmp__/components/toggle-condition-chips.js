import React from 'react';
import { ToggleButton } from '@mui/material';
import ConditionTypography from './commons/ConditionTypography';
import { StyledToggleButtonGroup } from './commons/StyledToggleButtonGroup';

export default function ToggleCondition(props) {
  const { value, onChange, ...other } = props;

  return (
    <StyledToggleButtonGroup value={value} onChange={onChange} aria-label='condition' {...other}>
      {['NM', 'EX', 'GD', 'LP', 'PL', 'PO'].map((condition) => (
        <ToggleButton key={condition} value={condition} aria-label={`${condition} condition`}>
          <ConditionTypography condition={condition} variant='caption' />
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}
