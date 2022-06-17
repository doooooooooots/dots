import React from 'react';
import PopperStyled from './field-popper-styled';
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import FieldInputEdit from './field-input-edit';
import FieldInputValue from './field-input-value';
import { FIELD_INPUT_CLASSNAME } from '../../../constants/classnames';
import { isObject } from 'lodash';

function FieldInput(props) {
  const { name, type, loading, value, onChange, sx, ...other } = props;

  const popupState = usePopupState({
    variant: 'popper',
    popupId: `${name}-popper-field`,
  });
  const { isOpen, close, anchorEl } = popupState;

  return (
    <>
      <FieldInputValue
        {...bindToggle(popupState)}
        className={FIELD_INPUT_CLASSNAME}
        isOpen={isOpen}
        loading={loading}
        sx={sx}
      >
        {isObject(value) ? value.id : value}
      </FieldInputValue>

      <PopperStyled {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <FieldInputEdit
            id={`${name}-popper-input`}
            anchorEl={anchorEl}
            type={type}
            value={value}
            onChange={onChange}
            onClose={close}
            {...other}
          />
        )}
      </PopperStyled>
    </>
  );
}

export default FieldInput;
