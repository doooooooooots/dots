import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EntityCreate from './entity-create-stepper';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Form Creator
 * @param props
 * @returns
 */
function FormInDialog(props) {
  const {
    startIcon,
    variant = 'contained',
    size = 'medium',
    entityName,
    onSubmitCallback,
    children,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={startIcon}
        variant={variant}
        size={size}
        onClick={handleClickOpen}
        sx={{ height: 30 }}
      >
        {children}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogContent sx={{ p: 5 }}>
          <EntityCreate
            entityName={entityName}
            onCancel={handleClose}
            onSubmitCallback={onSubmitCallback}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormInDialog;
