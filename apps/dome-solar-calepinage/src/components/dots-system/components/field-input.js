import React from 'react';
import PopperStyled from './field-popper-styled';
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import FieldInputEdit from './field-input-edit';
import FieldInputValueDefault from './field-input-value-default';
import FieldInputValueEnum from './field-input-value-enum';
import FieldInputValueRelationShip from './field-input-value-relationship';
import { FIELD_INPUT_CLASSNAME } from '../../../constants/classnames';

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
    default:
      Value = FieldInputValueDefault;
      break;
  }

  return (
    <>
      <Value
        {...bindToggle(popupState)}
        type={type}
        value={value}
        className={FIELD_INPUT_CLASSNAME}
        isOpen={!readOnly && isOpen}
        options={options}
        loading={loading}
        sx={sx}
      />

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
