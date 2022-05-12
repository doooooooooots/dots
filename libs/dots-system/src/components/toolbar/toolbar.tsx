import {
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { isEmpty } from 'lodash';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OutboxIcon from '@mui/icons-material/Outbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import {
  UPDATE_MANY,
  DELETE_MANY,
  MOVE,
  PUBLISH,
  UNLIST,
  UNPUBLISH,
} from '@dots.cool/tokens';
import { useCallback } from 'react';
import SelectViewMode from '../select-view-mode/select-view-mode';

const ToolbarButton = (props) => {
  const { children, startIcon, onClick, disabled, color = 'primary' } = props;
  return (
    <Button
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

function ToolbarData(props) {
  const { selectionModel, onActionClick, viewMode, onViewModeChange } = props;

  const handleButtonClick = useCallback(
    (action) => () => {
      onActionClick(action);
    },
    [onActionClick]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        px: 1,
        py: '2px',
        m: 0,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="caption">{`${selectionModel.length} éléments`}</Typography>
        {!isEmpty(selectionModel) && (
          <Stack direction="row" alignItems="center">
            <ToolbarButton
              onClick={handleButtonClick(UPDATE_MANY)}
              startIcon={<EditOutlinedIcon />}
            >
              Modifier
            </ToolbarButton>
            <ToolbarButton
              onClick={handleButtonClick(MOVE)}
              startIcon={<CallSplitIcon />}
            >
              Déplacer
            </ToolbarButton>
            <ToolbarButton
              onClick={handleButtonClick(PUBLISH)}
              startIcon={<BackupOutlinedIcon />}
            >
              Publier
            </ToolbarButton>
            <ToolbarButton
              color="warning"
              onClick={handleButtonClick(UNPUBLISH)}
              startIcon={<CloudOffOutlinedIcon />}
            >
              Dépublier
            </ToolbarButton>
            <ToolbarButton
              color="error"
              onClick={handleButtonClick(UNLIST)}
              startIcon={<OutboxIcon />}
            >
              Sortir
            </ToolbarButton>
            <ToolbarButton
              color="error"
              onClick={handleButtonClick(DELETE_MANY)}
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </ToolbarButton>
          </Stack>
        )}
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          control={<Switch size="small" />}
          label="Edition rapide"
          componentsProps={{ typography: { variant: 'caption' } }}
        />
        <SelectViewMode
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <ToolbarButton
          onClick={handleButtonClick(DELETE_MANY)}
          startIcon={<FullscreenIcon />}
        >
          Plein écran
        </ToolbarButton>
        {/* <GridToolbarExport sx={{ mr: 1, color: 'text.primary' }} /> */}
      </Stack>
    </Stack>
  );
}
export default ToolbarData;
