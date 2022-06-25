import React from 'react';
import { IconButton, Stack, Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../contexts/useStore';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';

import ToolbarSelection from './toolbar/toolbar-selection';
import ToolbarActions from './toolbar/toolbar-actions';

const Toobar = () => {
  const { getCurrentPage, reloadSize } = useStore();
  const showToolbar = getCurrentPage() === 'layout';

  return (
    <Stack>
      {showToolbar && (
        <>
          <ToolbarSelection />
          <Box height={5} bgcolor="neutral.background" />
          <IconButton
            onClick={reloadSize}
            sx={{ bgcolor: 'background.default', borderRadius: 0 }}
          >
            <AspectRatioOutlinedIcon fontSize="small" />
          </IconButton>
          <Box height={5} bgcolor="neutral.background" />
          <ToolbarActions />
        </>
      )}
    </Stack>
  );
};

export default observer(Toobar);
