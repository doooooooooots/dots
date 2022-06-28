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

function FormInDialog(props) {
  const {
    variant = 'contained',
    size = 'medium',
    entityName,
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
      <Button variant={variant} size={size} onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ p: 5 }}>
            <EntityCreate entityName={entityName} onCancel={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormInDialog;
