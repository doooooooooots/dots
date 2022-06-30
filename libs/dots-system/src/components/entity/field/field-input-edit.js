import React, { useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  ClickAwayListener,
  Divider,
} from '@mui/material';
import { Box } from '@mui/system';

// [ ](Adrien): use dynamic import
import InputNumber from '../input/input-number';
import InputText from '../input/input-text';
import InputDate from '../input/input-date';
import InputRelationshipWithFetch from '../input/input-relationship-with-fetch';
import InputEnumWithFetch from '../input/input-enum-with-fetch';
import InputDimension from '../input/input-dimension';
import InputTag from '../input/input-tag';
import InputReaction from '../input/input-reaction';
import InputCheckbox from '../input/input-checkbox';
import InputFile from '../input/input-file';

import withSmartPopper from '../../../hoc/with-smart-popper/with-smart-popper';
import Actions from '../actions';
import { FIELD_TYPES } from '@dots.cool/tokens';

function FieldInputEdit(props) {
  const {
    type,
    value,
    anchorEl,
    onChange,
    onClose,
    askForConfirmation,
    clickAction,
    ...other
  } = props;

  // [ ](Adrien): use dynamic import
  let PopperContent;
  switch (type) {
    case FIELD_TYPES.dimension:
    case FIELD_TYPES.number:
    case FIELD_TYPES.integer:
      PopperContent = InputNumber;
      break;
    case FIELD_TYPES.text:
    default:
      PopperContent = InputText;
      break;
    case FIELD_TYPES.timestamp:
      PopperContent = InputDate;
      break;
    case FIELD_TYPES.relationship:
      PopperContent = InputRelationshipWithFetch;
      break;
    case FIELD_TYPES.select:
      PopperContent = InputEnumWithFetch;
      break;
    case FIELD_TYPES.tag:
      PopperContent = InputTag;
      break;
    case FIELD_TYPES.checkbox:
      PopperContent = InputCheckbox;
      break;
    case FIELD_TYPES.reaction:
      PopperContent = InputReaction;
      break;
    case FIELD_TYPES.file:
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
      ({ target, currentTarget }) => {
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
  );
}

export default FieldInputEdit;
