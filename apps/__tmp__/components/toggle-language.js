import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldCountryFlagShow from './field-country-flag-show';

export default function ToggleLanguage(props) {
  const { language, onChange, sx } = props;

  const handleChange = (_, newValue) => {
    onChange({ target: { name: 'language' } }, newValue);
  };

  return (
    <ToggleButtonGroup
      value={language}
      onChange={handleChange}
      aria-label='language'
      exclusive
      sx={{
        ...(sx || {}),
        '& .Mui-selected': {
          backgroundColor: 'rgba(150,150, 150, 0.8)',
          '&[value="fr"]': {
            backgroundColor: 'rgb(100,100,230)',
            '&:hover': {
              backgroundColor: 'rgb(80,80,200)'
            }
          },
          '&[value="gb"]': {
            backgroundColor: 'rgb(250,90,90)',
            '&:hover': {
              backgroundColor: 'rgb(220,60,60)'
            }
          }
        }
      }}
    >
      {['fr', 'en'].map((value) => (
        <ToggleButton key={value} name='language' value={value} aria-label={value}>
          <FieldCountryFlagShow countryCode={value} />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
