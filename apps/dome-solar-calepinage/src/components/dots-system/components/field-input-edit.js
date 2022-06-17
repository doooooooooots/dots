import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  ClickAwayListener,
  Divider,
} from '@mui/material';
import InputNumber from './popper-number';
import { Box } from '@mui/system';
import PopperText from './popper-text';
import PopperDate from './popper-date';
import PopperLink from './popper-link';
import PopperSelect from './popper-select';
import PopperDimension from './popper-dimension';
import PopperTag from './popper-tag';
import PopperReaction from './popper-reaction';

import withSmartPopper from './hoc/with-smart-popper';
import Actions from './actions';
import { useWhyDidYouUpdate } from '@dots.cool/hooks';

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

  useWhyDidYouUpdate('InputEdit', props);

  let PopperContent;
  switch (type) {
    case 'number':
      PopperContent = InputNumber;
      break;
    case 'text':
    default:
      PopperContent = PopperText;
      break;
    case 'date':
      PopperContent = PopperDate;
      break;
    case 'link':
      PopperContent = PopperLink;
      break;
    case 'dimension':
      PopperContent = PopperDimension;
      break;
    case 'list':
      PopperContent = PopperSelect;
      break;
    case 'tag':
      PopperContent = PopperTag;
      break;
    case 'reaction':
      PopperContent = PopperReaction;
      break;
  }

  const SmartContent = withSmartPopper(PopperContent);
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
