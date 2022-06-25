import React from 'react';
import PopperStyled from './field-popper-styled';
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { Box, CircularProgress } from '@mui/material';

// [ ](Adrien): Use dynamic import + suspense
import FieldInputEdit from './field-input-edit';
import FieldInputValueDefault from './field-input-value-default';
import FieldInputValueEnum from './field-input-value-enum';
import FieldInputValueRelationShip from './field-input-value-relationship';
import FieldInputValueDate from './field-input-value-date';
import FieldInputValueDimension from './field-input-value-dimension';
import FieldInputValueBase from './field-input-value-base';
import FieldInputValueCheckbox from './field-input-value-checkbox';

function FieldInput(props) {
  const {
    name,
    type,
    loading,
    value,
    onChange,
    options,
    readOnly,
    sx,
    ...other
  } = props;

  const popupState = usePopupState({
    variant: 'popper',
    popupId: `${name}-popper-field`,
  });
  const { isOpen, close, anchorEl } = popupState;

  let Value;

  switch (type) {
    case 'relationship':
      Value = FieldInputValueRelationShip;
      break;
    case 'select':
      Value = FieldInputValueEnum;
      break;
    case 'date':
      Value = FieldInputValueDate;
      break;
    case 'dimension':
      Value = FieldInputValueDimension;
      break;
    case 'checkbox':
      Value = FieldInputValueCheckbox;
      break;
    default:
      Value = FieldInputValueDefault;
      break;
  }

  return (
    <>
      {!loading ? (
        <FieldInputValueBase
          {...bindToggle(popupState)}
          isOpen={!readOnly && isOpen}
          sx={sx}
        >
          <Value {...Value.bindProp(props)} />
        </FieldInputValueBase>
      ) : (
        <Box pl={2}>
          <CircularProgress color="neutral" size={15} />
        </Box>
      )}

      {!readOnly && anchorEl && (
        <PopperStyled {...bindPopper(popupState)} placement="bottom-start">
          {isOpen && (
            <FieldInputEdit
              id={`${name}-popper-input`}
              anchorEl={anchorEl}
              type={type}
              value={value}
              options={options}
              onChange={onChange}
              onClose={close}
              {...other}
            />
          )}
        </PopperStyled>
      )}
    </>
  );
}

export default FieldInput;
