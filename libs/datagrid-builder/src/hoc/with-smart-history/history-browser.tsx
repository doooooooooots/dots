import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import useHistory from './use-history';

function HistoryBrowser(props: any) {
  const {
    state,
    path,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    history,
    goTo,
    close,
  } = useHistory();

  const handleClose = useCallback(() => {
    clear();
  }, [clear]);

  const handleGoToClick = useCallback(
    (index) => () => {
      goTo(index);
    },
    [goTo]
  );

  const handleCloseTabClick = useCallback(
    (index) => () => {
      close(index);
    },
    [close]
  );

  if (isEmpty(state)) return null;

  const { Component } = state;

  return (
    <Dialog
      {...props}
      open={!!state}
      onClose={handleClose}
      PaperProps={{ sx: { bgcolor: 'neutral.25', p: 2, height: '100%' } }}
      fullWidth
      maxWidth={state.width || 'xl'}
    >
      <Stack spacing={1}>
        <DialogTitle
          sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default' }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            {/* Navigation */}
            <Stack direction="row" alignItems="center">
              <IconButton onClick={undo} disabled={!canUndo}>
                <ArrowBackIosIcon fontSize="inherit" />
              </IconButton>
              <IconButton onClick={redo} disabled={!canRedo}>
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
              <Typography
                variant="h6"
                ml={1}
                width={140}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {`${state?.title}`}
              </Typography>
            </Stack>

            {/* Tabs */}
            <Stack direction="row" flex={1} spacing={2}>
              {!isEmpty(history) &&
                history.path.map((path, index) => {
                  return (
                    <Chip
                      key={`${path}-${index}`}
                      label={`${path}`}
                      variant="outlined"
                      onClick={handleGoToClick(index)}
                      onDelete={handleCloseTabClick(index)}
                    />
                  );
                })}
            </Stack>

            {/* Close btns */}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Component id={path} {...(state.componentProps || {})} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

export default HistoryBrowser;
