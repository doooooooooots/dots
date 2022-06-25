import React from 'react';
import Cursor from '../../../icons/cursor';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { HighlightAltOutlined, PanToolOutlined } from '@mui/icons-material';
import { useStore } from '../../../contexts/useStore';
import { observer } from 'mobx-react';

function ToolbarSelection(props) {
  const store = useStore();

  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      store.setViewMode(newMode);
      store.resetSelected();
    }
  };
  return (
    <ToggleButtonGroup
      size="small"
      orientation="vertical"
      value={store.getViewMode()}
      onChange={handleChange}
      exclusive
      sx={{
        bgcolor: 'background.default',
        border: 0,
        borderRadius: 0,
        button: {
          border: 0,
          borderRadius: 0,
        },
      }}
      {...props}
    >
      <ToggleButton value="default">
        <Cursor fontSize="small" />
      </ToggleButton>

      <ToggleButton value="select">
        <HighlightAltOutlined fontSize="small" />
      </ToggleButton>

      <ToggleButton value="pan">
        <PanToolOutlined fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default observer(ToolbarSelection);
