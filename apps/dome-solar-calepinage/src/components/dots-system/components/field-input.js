import React from 'react';
import PopperStyled from './field-popper-styled';
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import FieldInputEdit from './field-input-edit';
import FieldInputValue from './field-input-value';

function FieldInput(props) {
  const { name, type, value, onChange, sx } = props;

  const popupState = usePopupState({
    variant: 'popper',
    popupId: `${name}-popper-field`,
  });
  const { isOpen, close } = popupState;

  return (
    <>
      <FieldInputValue {...bindToggle(popupState)} isOpen={isOpen} sx={sx}>
        {value}
      </FieldInputValue>
      <PopperStyled {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <FieldInputEdit
            id={`${name}-popper-input`}
            type={type}
            value={value}
            onChange={onChange}
            onClose={close}
          />
        )}
      </PopperStyled>
    </>
  );
}

export default FieldInput;
