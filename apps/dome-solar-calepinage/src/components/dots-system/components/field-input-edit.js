import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  ClickAwayListener,
  Divider,
} from '@mui/material';
import { Box } from '@mui/system';

// [ ](Adrien): use dynamic import
import InputNumber from './input-number';
import InputText from './input-text';
import InputDate from './input-date';
import InputLink from './input-link';
import InputSelect from './input-enum';
import InputDimension from './input-dimension';
import InputTag from './input-tag';
import InputReaction from './input-reaction';
import InputCheckbox from './input-checkbox';

import withSmartPopper from './hoc/with-smart-popper';
import Actions from './actions';
import InputFile from './input-file';

function FieldInputEdit(props) {
  const {
    type,
    value,
    anchorEl,
    onChange,
    onClose,
    askForConfirmation,
    ...other
  } = props;

  // [ ](Adrien): use dynamic import
  let PopperContent;
  switch (type) {
    case 'number':
      PopperContent = InputNumber;
      break;
    case 'text':
    default:
      PopperContent = InputText;
      break;
    case 'date':
      PopperContent = InputDate;
      break;
    case 'link':
      PopperContent = InputLink;
      break;
    case 'dimension':
      PopperContent = InputDimension;
      break;
    case 'list':
      PopperContent = InputSelect;
      break;
    case 'tag':
      PopperContent = InputTag;
      break;
    case 'checkbox':
      PopperContent = InputCheckbox;
      break;
    case 'reaction':
      PopperContent = InputReaction;
      break;
    case 'file':
      PopperContent = InputFile;
      break;
  }

  /**
   * When user validates new data
   */
  const handleChange = useCallback(
    (data) => {
      // [ ](Adrien): Create compare function
      if (value !== data) {
        if (typeof onChange === 'function') {
          onChange(data);
        }
      }
      onClose();
    },
    [onChange, onClose, value]
  );

  /**
   * When user click outside of popper
   * ? Click away needs to be outside the render component
   */

  /**
   *  1. We Create a sharable pending state
   */
  const SmartContent = withSmartPopper(PopperContent);

  /**
   *  2. We a function which takes the submit func from children
   */
  const handleClickAway = useCallback(
    (action) =>
      ({ target }) => {
        if (target !== anchorEl) {
          if (typeof action === 'function') {
            action();
          } else {
            onClose();
          }
        }
      },
    [anchorEl, onClose]
  );

  return (
    <>
      <SmartContent
        value={value}
        onChange={handleChange}
        onCancel={onClose}
        onClose={onClose}
        {...other}
      >
        {({ submit, cancel, content }) => (
          <>
            <ClickAwayListener
              onClickAway={handleClickAway(submit)}
              mouseEvent={'onMouseDown'}
            >
              <Box>
                {content}
                <Divider />
                <Actions onConfirm={submit} onCancel={onClose} />
              </Box>
            </ClickAwayListener>

            <Dialog open={false}>
              <DialogContent>Hello</DialogContent>
            </Dialog>
          </>
        )}
      </SmartContent>
    </>
  );
}

export default FieldInputEdit;
