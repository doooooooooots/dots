import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useKey } from 'react-use';
import Kbd from '../../design-system/kbd/kbd';

function Actions(props) {
  const { onConfirm, onCancel } = props;

  const confirmBtn = useRef();

  useKey('Enter', () => confirmBtn.current.click());
  useKey('Escape', onCancel);

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
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
        <Kbd shortcut="⮐">Enter</Kbd>
      </Button>
    </Stack>
  );
}

export default Actions;
