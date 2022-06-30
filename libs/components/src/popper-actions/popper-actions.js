import React from 'react';
import { Button, Stack } from '@mui/material';

function PopperActions(props) {
  const { onConfirm, onCancel } = props;
  return (
    <Stack direction="row" justifyContent="flex-end">
      <Button onClick={onCancel} size="small" color="neutral">
        Annuler
      </Button>
      <Button onClick={onConfirm} size="small">
        Valider
      </Button>
    </Stack>
  );
}

export default PopperActions;
