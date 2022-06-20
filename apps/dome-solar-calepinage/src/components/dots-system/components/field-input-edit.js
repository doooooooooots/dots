import React, { useCallback, useMemo } from 'react';
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
import InputRelationshipWithFetch from './input-relationship-with-fetch';
import InputEnumWithFetch from './input-enum-with-fetch';
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
    case 'relationship':
      PopperContent = InputRelationshipWithFetch;
      break;
    case 'dimension':
      PopperContent = InputDimension;
      break;
    case 'select':
      PopperContent = InputEnumWithFetch;
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
   * When user click outside of popper
   * ? Click away needs to be outside the render component
   * 1. We Create a sharable pending state
   */
  const SmartContent = useMemo(
    () => withSmartPopper(PopperContent),
    [PopperContent]
  );

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
        onChange={onChange}
        onCancel={onClose}
        onClose={onClose}
        {...other}
      >
        {({ submit, cancel, content }) => (
          <>
            <ClickAwayListener
              onClickAway={handleClickAway(cancel)}
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
