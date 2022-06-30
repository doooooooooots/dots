import React from 'react';
import PopperStyled from './field-popper-styled';
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { Box, CircularProgress, Button } from '@mui/material';

// [ ](Adrien): Use dynamic import + suspense
import FieldInputEdit from './field-input-edit';
import FieldInputValueDefault from './field-input-value-default';
import FieldInputValueEnum from './field-input-value-enum';
import FieldInputValueRelationShip from './field-input-value-relationship';
import FieldInputValueDate from './field-input-value-date';
import FieldInputValueDimension from './field-input-value-dimension';
import FieldInputValueBase from './field-input-value-base';
import FieldInputValueCheckbox from './field-input-value-checkbox';
import { FIELD_TYPES } from '@dots.cool/tokens';

function FieldInput(props) {
  const {
    name,
    type,
    variant = 'field',
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
    case FIELD_TYPES.relationship:
      Value = FieldInputValueRelationShip;
      break;
    case FIELD_TYPES.select:
      Value = FieldInputValueEnum;
      break;
    case FIELD_TYPES.timestamp:
      Value = FieldInputValueDate;
      break;
    case FIELD_TYPES.dimension:
      Value = FieldInputValueDimension;
      break;
    case FIELD_TYPES.checkbox:
      Value = FieldInputValueCheckbox;
      break;
    default:
      Value = FieldInputValueDefault;
      break;
  }

  return (
    <>
      {!loading ? (
        <>
          {variant === 'field' && (
            <FieldInputValueBase
              {...bindToggle(popupState)}
              isOpen={!readOnly && isOpen}
              sx={sx}
            >
              <Value {...Value.bindProp(props)} />
            </FieldInputValueBase>
          )}
          {variant === 'button' && (
            <Button
              {...bindToggle(popupState)}
              disabled={!readOnly && isOpen}
              color="neutral"
              sx={sx}
            >
              <Value {...Value.bindProp(props)} />
            </Button>
          )}
        </>
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
