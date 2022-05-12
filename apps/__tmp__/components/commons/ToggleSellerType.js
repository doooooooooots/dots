import React, { useCallback } from 'react';
import { ToggleButton } from '@mui/material';
import { setValue } from '../../_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import { StyledToggleButtonGroup } from './StyledToggleButtonGroup';

const selector = (state) => state.filter;

export default function ToggleSellerType() {
  const dispatch = useDispatch();
  const { sellerTypeIn } = useSelector(selector);

  const handleSellerTypeChange = useCallback(
    (event, newValue) => {
      dispatch(setValue('sellerTypeIn', newValue));
    },
    [dispatch]
  );

  return (
    <StyledToggleButtonGroup value={sellerTypeIn} onChange={handleSellerTypeChange} aria-label='seller type'>
      <ToggleButton value={0} aria-label='non pro seller'>
        ␀
      </ToggleButton>
      <ToggleButton value={1} aria-label='pro seller'>
        💶
      </ToggleButton>
      <ToggleButton value={2} aria-label='powerseller'>
        👑
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
