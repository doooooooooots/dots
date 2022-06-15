import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useStore } from '../../contexts/useStore';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { observer } from 'mobx-react';
import { SELECTED } from '../../constants/classnames';

function ToolbarActions(props) {
  const store = useStore();
  const { isPassingTests, getActionMode, setActionMode, resetSelected } = store;

  const handleChange = (_, newMode) => {
    if (newMode !== null) {
      setActionMode(newMode);
      resetSelected();
    }
  };
  return (
    <ToggleButtonGroup
      size="small"
      orientation="vertical"
      value={getActionMode()}
      onChange={handleChange}
      exclusive
      sx={{
        bgcolor: 'background.default',
        border: 0,
        borderRadius: 0,
        button: {
          border: 0,
          borderRadius: 0,
          [`&${SELECTED}`]: {
            boxShadow: (theme) => `2px 0 0 0 ${theme.palette.neutral.main}`,
          },
        },
      }}
      {...props}
    >
      <ToggleButton value="alignment">
        <VerticalAlignCenterIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="obstacles">
        <AddBoxIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="tests">
        {isPassingTests() ? (
          <CheckCircleOutlineIcon color="success" fontSize="small" />
        ) : (
          <ErrorOutlineIcon color="error" fontSize="small" />
        )}
      </ToggleButton>
      <ToggleButton value="export">
        <FileDownloadOutlinedIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default observer(ToolbarActions);
