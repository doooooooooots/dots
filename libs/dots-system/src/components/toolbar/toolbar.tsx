import { useCallback, useState } from 'react';

import {
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';

import { isEmpty } from 'lodash';

import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { openFullscreen, exitFullscreen } from '@dots.cool/utils';

import CallSplitIcon from '@mui/icons-material/CallSplit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OutboxIcon from '@mui/icons-material/Outbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';

import SelectViewMode from '../select-view-mode/select-view-mode';

const ToolbarButton = (props: any) => {
  const { children, startIcon, onClick, disabled, color = 'primary' } = props;
  return (
    <Button
      size="small"
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

function ToolbarData(props: any) {
  const { selectionModel, onActionClick, viewMode, onViewModeChange } = props;

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleButtonClick = useCallback(
    (action) => () => {
      onActionClick(action);
    },
    [onActionClick]
  );

  const handleFullScreenButtonClick = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
      setIsFullscreen(false);
    } else {
      openFullscreen();
      setIsFullscreen(true);
    }
  }, [isFullscreen, setIsFullscreen]);

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
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="caption">{`${selectionModel.length} élément sélectionné`}</Typography>
        {!isEmpty(selectionModel) && (
          <Stack direction="row" alignItems="center">
            <ToolbarButton
              onClick={handleButtonClick(GRAPHQL_ACTIONS.UpdateMany)}
              startIcon={<EditOutlinedIcon />}
            >
              Modifier
            </ToolbarButton>
            <ToolbarButton
              onClick={handleButtonClick(GRAPHQL_ACTIONS.MoveMany)}
              startIcon={<CallSplitIcon />}
            >
              Déplacer
            </ToolbarButton>
            <ToolbarButton
              onClick={handleButtonClick(GRAPHQL_ACTIONS.PublishMany)}
              startIcon={<BackupOutlinedIcon />}
            >
              Publier
            </ToolbarButton>
            <ToolbarButton
              color="warning"
              onClick={handleButtonClick(GRAPHQL_ACTIONS.UnpublishMany)}
              startIcon={<CloudOffOutlinedIcon />}
            >
              Dépublier
            </ToolbarButton>
            <ToolbarButton
              color="error"
              onClick={handleButtonClick(GRAPHQL_ACTIONS.UnlistMany)}
              startIcon={<OutboxIcon />}
            >
              Sortir
            </ToolbarButton>
            <ToolbarButton
              color="error"
              onClick={handleButtonClick(GRAPHQL_ACTIONS.DeleteMany)}
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
        {isFullscreen ? (
          <ToolbarButton
            onClick={handleFullScreenButtonClick}
            startIcon={<FullscreenExitIcon />}
          >
            Réduire l'écran
          </ToolbarButton>
        ) : (
          <ToolbarButton
            onClick={handleFullScreenButtonClick}
            startIcon={<FullscreenIcon />}
          >
            Plein écran
          </ToolbarButton>
        )}
        {/* <GridToolbarExport sx={{ mr: 1, color: 'text.primary' }} /> */}
      </Stack>
    </Stack>
  );
}
export default ToolbarData;
