import React from 'react';
import { ToggleButton } from '@mui/material';
import { StyledToggleButtonGroup } from './StyledToggleButtonGroup';

export default function ToggleIsFirstEd(props) {
  const { value, onChange, ...other } = props;

  return (
    <StyledToggleButtonGroup exclusive value={value} onChange={onChange} aria-label='is first' {...other}>
      <ToggleButton value={false} aria-label='not first'>
        ∅ 1<sup>st</sup>
      </ToggleButton>
      <ToggleButton value={true} aria-label='is first'>
        ✅ 1<sup>st</sup>
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
