import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useKey } from 'react-use';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Kbd from '../../design-system/kbd/kbd';

function PopperActions(props) {
  const { onConfirm, onCancel, variant = 'standard' } = props;

  const confirmBtn = useRef();

  useKey('Enter', () => confirmBtn.current.click());
  useKey('Escape', onCancel);

  return (
    <Stack direction="row" justifyContent="flex-end">
      <Button
        startIcon={<CloseIcon />}
        onClick={onCancel}
        size="small"
        color="error"
      >
        <Kbd>Esc</Kbd>
      </Button>
      <Button
        ref={confirmBtn}
        startIcon={<DoneIcon />}
        onClick={onConfirm}
        size="small"
        color="success"
      >
        <Kbd>
          <KeyboardReturnIcon fontSize={'inherit'} /> <span>Enter</span>
        </Kbd>
      </Button>
    </Stack>
  );
}

export default PopperActions;
