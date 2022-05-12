import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';
import Kbd from '@components/Kbd';
import { useKeyPressEvent } from 'react-use';

function KbdSwitchLabelled(props) {
  const { checked, label, onChange, kbd, ...other } = props;

  useKeyPressEvent((e) => e.key.toLowerCase() === kbd, onChange);

  const Label = (
    <>
      {label} <Kbd>{kbd}</Kbd>
    </>
  );
  return (
    <FormGroup {...other}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label={Label}
        sx={{
          '& .MuiTypography-root': {
            textTransform: 'uppercase',
            fontSize: 11
          },
          '& kbd': {
            textTransform: 'none'
          }
        }}
      />
    </FormGroup>
  );
}

export default React.memo(KbdSwitchLabelled);
