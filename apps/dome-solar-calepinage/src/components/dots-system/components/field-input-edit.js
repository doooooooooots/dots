import React, { useRef } from 'react';
import { Dialog, DialogContent, ClickAwayListener } from '@mui/material';
import PopperNumber from './popper-number';
import { Box } from '@mui/system';

function FieldInputEdit(props) {
  const { type, value, onChange, onClose, askForConfirmation } = props;

  const input = useRef(value);

  let PopperContent;
  switch (type) {
    case 'number':
      PopperContent = PopperNumber;
      break;
    case 'text':
    default:
      PopperContent = PopperNumber;
      break;
    case 'select':
      PopperContent = PopperNumber;
      break;
    case 'link':
      PopperContent = PopperNumber;
      break;
  }

  return (
    <PopperContent value={input} onSubmit={onChange} onCancel={onClose}>
      {({ submit, cancel, content }) => (
        <>
          <ClickAwayListener onClickAway={onClose} mouseEvent={'onMouseDown'}>
            <Box>{content}</Box>
          </ClickAwayListener>
          <Dialog open={false}>
            <DialogContent>Hello</DialogContent>
          </Dialog>
        </>
      )}
    </PopperContent>
  );
}

export default FieldInputEdit;
