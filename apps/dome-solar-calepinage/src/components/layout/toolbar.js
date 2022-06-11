import React from 'react';
import { Divider, IconButton, Stack, Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ToolbarSelection from './toolbar-selection';
import ToolbarActions from './toolbar-actions';

const Toobar = (props) => {
  const store = useStore();
  return (
    <Stack>
      <ToolbarSelection />
      <Box height={5} bgcolor="neutral.background" />
      <IconButton
        onClick={store.reloadSize}
        sx={{ bgcolor: 'background.default', borderRadius: 0 }}
      >
        <AspectRatioOutlinedIcon fontSize="small" />
      </IconButton>
      <Box height={5} bgcolor="neutral.background" />
      <ToolbarActions />
    </Stack>
  );
};

export default observer(Toobar);
