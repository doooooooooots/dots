import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from '../../hooks';
import { TransitionProps } from '@mui/material/transitions';
import EntityCreateContained from '../entity-create/entity-create-contained';
import DotsDatagrid from '../../pages/dots-datagrid';
import EntitySingle from '../entity/entity-single';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HistoryBrowser(props: any) {
  const { present, undo, redo, clear, canUndo, canRedo, history, goTo, close } =
    useHistory();

  const open = !!present;

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

  useEffect(() => {
    if (!open) {
      clear();
    }
  }, [open, clear]);

  if (isEmpty(present)) return null;

  const { path, title, entityName, variant, where, width = 'xl' } = present;

  let Component;

  switch (variant) {
    default:
    case 'single':
      Component = EntitySingle;
      break;
    case 'preview':
      Component = DotsDatagrid;
      break;
    case 'create':
      Component = EntityCreateContained;
      break;
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="lg"
    >
      <Stack spacing={1}>
        <DialogTitle
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: 'background.default',
            width: '100%',
          }}
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
                {`${title}`}
              </Typography>
            </Stack>

            {/* Tabs */}
            <Stack direction="row" flex={1} spacing={2}>
              {!isEmpty(history) &&
                history.paths.map((path, index) => {
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

        <Divider />

        <DialogContent sx={{ p: 0, m: '0!important' }}>
          <Component
            entityName={entityName}
            boundary="history-popper"
            variant={variant}
            where={where}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

export default HistoryBrowser;
