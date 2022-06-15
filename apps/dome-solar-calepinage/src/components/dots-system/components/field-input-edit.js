import React from 'react';
import { Dialog, DialogContent, ClickAwayListener } from '@mui/material';
import PopperNumber from './popper-number';
import { Box } from '@mui/system';
import PopperText from './popper-text';
import PopperDate from './popper-date';
import PopperLink from './popper-link';

function FieldInputEdit(props) {
  const { type, value, onChange, onClose, askForConfirmation } = props;

  let PopperContent;
  switch (type) {
    case 'number':
      PopperContent = PopperNumber;
      break;
    case 'text':
    default:
      PopperContent = PopperText;
      break;
    case 'select':
      PopperContent = PopperNumber;
      break;
    case 'date':
      PopperContent = PopperDate;
      break;
    case 'link':
      PopperContent = PopperLink;
      break;
  }

  return (
    <>
      <PopperContent value={value} onSubmit={onChange} onCancel={onClose}>
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
    </>
  );
}

export default FieldInputEdit;
