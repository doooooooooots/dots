import React from 'react';
import { Divider, IconButton, Stack, ToggleButtonGroup } from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanToolOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';
import Cursor from '../../icons/cursor';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const Toobar = (props) => {
  const store = useStore();

  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      store.setViewMode(newMode);
      store.resetSelected();
    }
  };

  return (
    <Stack>
      <ToggleButtonGroup
        size="small"
        orientation="vertical"
        value={store.getViewMode()}
        onChange={handleChange}
        exclusive
        sx={{
          border: 0,
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
          <HighlightAltOutlinedIcon fontSize="small" />
        </ToggleButton>

        <ToggleButton value="pan">
          <PanToolIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider />
      <IconButton onClick={store.reloadSize}>
        <AspectRatioOutlinedIcon fontSize="small" />
      </IconButton>
      <Divider />
      <IconButton>
        <HelpOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default observer(Toobar);
