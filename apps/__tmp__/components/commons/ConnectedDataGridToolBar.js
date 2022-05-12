import React from 'react';
import { Button, Box, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import {
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarContainer,
  useGridApiContext,
  useGridState
} from '@mui/x-data-grid-pro';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OutboxIcon from '@mui/icons-material/Outbox';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import { DELETE_MULTIPLE, MOVE, PUBLISH, UNLIST, UNPUBLISH, UPDATE_MULTIPLE } from 'src/constants';

const ToolbarButton = (props) => {
  const { children, startIcon, onClick, disabled, color = 'primary' } = props;
  return (
    <Button variant='text' color={color} onClick={onClick} startIcon={startIcon} disabled={disabled}>
      {children}
    </Button>
  );
};

function GridToolbarFullScreen(props) {
  const { onOpen } = props;
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        width: '100%',
        borderBottom: 'divider',
        borderRadius: 0,
        px: 1
      }}
    >
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='caption'>{`${state.selection.length} éléments`}</Typography>
        <Box>
          <ToolbarButton
            onClick={onOpen(UPDATE_MULTIPLE, state.selection)}
            startIcon={<EditOutlinedIcon />}
            disabled={isEmpty(state.selection)}
          >
            Modifier
          </ToolbarButton>
          <ToolbarButton
            onClick={onOpen(MOVE, state.selection)}
            startIcon={<CallSplitIcon />}
            disabled={isEmpty(state.selection)}
          >
            Déplacer
          </ToolbarButton>
          <ToolbarButton
            onClick={onOpen(PUBLISH, state.selection)}
            startIcon={<BackupOutlinedIcon />}
            disabled={isEmpty(state.selection)}
          >
            Publier
          </ToolbarButton>
          <ToolbarButton
            color='warning'
            onClick={onOpen(UNPUBLISH, state.selection)}
            startIcon={<CloudOffOutlinedIcon />}
            disabled={isEmpty(state.selection)}
          >
            Dépublier
          </ToolbarButton>
          <ToolbarButton
            color='error'
            onClick={onOpen(UNLIST, state.selection)}
            startIcon={<OutboxIcon />}
            disabled={isEmpty(state.selection)}
          >
            Sortir
          </ToolbarButton>
          <ToolbarButton
            color='error'
            onClick={onOpen(DELETE_MULTIPLE, state.selection)}
            startIcon={<DeleteIcon />}
            disabled={isEmpty(state.selection)}
          >
            Supprimer
          </ToolbarButton>
        </Box>
      </Stack>

      <Box>
        <GridToolbarFilterButton sx={{ mr: 1, color: 'text.primary' }} />
        <GridToolbarExport sx={{ mr: 1, color: 'text.primary' }} />
      </Box>
    </Stack>
  );
}

export default function ConnectedDataGridToolbar(props) {
  const { onClickOpen } = props;
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <GridToolbarFullScreen onOpen={onClickOpen} />
    </GridToolbarContainer>
  );
}
