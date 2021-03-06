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
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { useCallback, useState } from 'react';
import SelectViewMode from '../select-view-mode/select-view-mode';
import { openFullscreen, exitFullscreen } from '@dots.cool/utils';

const ToolbarButton = (props: any) => {
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
      <Stack direction="row" alignItems="center">
        <Typography variant="caption">{`${selectionModel.length} ??l??ment s??lectionn??`}</Typography>
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
              D??placer
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
              D??publier
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
            R??duire l'??cran
          </ToolbarButton>
        ) : (
          <ToolbarButton
            onClick={handleFullScreenButtonClick}
            startIcon={<FullscreenIcon />}
          >
            Plein ??cran
          </ToolbarButton>
        )}
        {/* <GridToolbarExport sx={{ mr: 1, color: 'text.primary' }} /> */}
      </Stack>
    </Stack>
  );
}
export default ToolbarData;
