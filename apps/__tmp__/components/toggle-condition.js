import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleCondition(props) {
  const { condition, onChange, sx } = props;

  return (
    <ToggleButtonGroup
      value={condition}
      onChange={onChange}
      aria-label='condition'
      exclusive
      sx={{
        ...(sx || {}),
        '& .Mui-selected': {
          '&[value="PO"]': {
            color: '#fff',
            backgroundColor: 'condition.PO',
            '&:hover': {
              backgroundColor: 'condition.PO'
            }
          },
          '&[value="PL"]': {
            backgroundColor: 'condition.PL',
            '&:hover': {
              backgroundColor: 'condition.PL'
            }
          },
          '&[value="LP"]': {
            backgroundColor: 'condition.LP',
            '&:hover': {
              backgroundColor: 'condition.LP'
            }
          },
          '&[value="GD"]': {
            backgroundColor: 'condition.GD',
            '&:hover': {
              backgroundColor: 'condition.GD'
            }
          },
          '&[value="EX"]': {
            backgroundColor: 'condition.EX',
            '&:hover': {
              backgroundColor: 'condition.EX'
            }
          },
          '&[value="NM"]': {
            backgroundColor: 'condition.NM',
            '&:hover': {
              backgroundColor: 'condition.NM'
            }
          }
        }
      }}
    >
      {['PO', 'PL', 'LP', 'GD', 'EX', 'NM'].map((value) => (
        <ToggleButton key={value} name='condition' value={value} aria-label={value}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
