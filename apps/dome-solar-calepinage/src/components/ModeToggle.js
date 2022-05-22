import React from 'react';
import { ToggleButtonGroup } from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanToolOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import { observer } from 'mobx-react';
import { useStore } from './context/useStore';

const ModeToggle = (props) => {
  const store = useStore();

  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      store.setMode(newMode);
      store.resetSelected();
    }
  };

  return (
    <ToggleButtonGroup size='small' value={store.getViewMode()} onChange={handleChange} exclusive {...props}>
      <ToggleButton value='default'>
        <MouseOutlinedIcon />
      </ToggleButton>

      <ToggleButton value='select'>
        <AppRegistrationOutlinedIcon />
      </ToggleButton>

      <ToggleButton value='pan'>
        <PanToolIcon sx={{ mr: 1 }} />
        <kbd>space</kbd>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default observer(ModeToggle);
