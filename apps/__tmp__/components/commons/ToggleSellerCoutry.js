import React from 'react';
import { ToggleButton } from '@mui/material';
import { setValue } from '../../_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import FieldCountryFlagShow from '../field-country-flag-show';
import { StyledToggleButtonGroup } from './StyledToggleButtonGroup';

const selector = (state) => state.filter;

export default function ToggleSellerCountry() {
  const dispatch = useDispatch();
  const { sellerCountryIn } = useSelector(selector);

  const handleSellerCountryChange = (event, newValue) => {
    dispatch(setValue('sellerCountryIn', newValue));
  };

  return (
    <StyledToggleButtonGroup value={sellerCountryIn} onChange={handleSellerCountryChange} aria-label='seller country'>
      <ToggleButton value='fr' aria-label='seller fr'>
        <FieldCountryFlagShow countryCode={'fr'} />
      </ToggleButton>
      <ToggleButton value='eu' aria-label='seller eu'>
        <FieldCountryFlagShow countryCode={'eu'} />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
