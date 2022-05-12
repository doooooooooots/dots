import React from 'react';
import { ToggleButton } from '@mui/material';
import { setValue } from '../../_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import { StyledToggleButtonGroup } from './StyledToggleButtonGroup';

const selector = (state) => state.filter;

export default function ToggleAbberation() {
  const dispatch = useDispatch();
  const { onlyAbberation } = useSelector(selector);

  const handleOnlyAbberation = (event, newValue) => {
    dispatch(setValue('onlyAbberation', newValue));
  };

  return (
    <StyledToggleButtonGroup exclusive value={onlyAbberation} onChange={handleOnlyAbberation} aria-label='is first'>
      <ToggleButton value={false} aria-label='without abberation'>
        ∅ 😱
      </ToggleButton>
      <ToggleButton value={true} aria-label='with abberation'>
        😱
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
