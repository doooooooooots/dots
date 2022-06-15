import React from 'react';
import Popper from '../../popper-styled';
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
  const { isOpen } = popupState;
  const { onClick, ...toggleProps } = bindToggle(popupState);

  return (
    <>
      <FieldInputValue
        {...toggleProps}
        onMouseDown={onClick}
        isOpen={isOpen}
        sx={sx}
      >
        {value}
      </FieldInputValue>
      <Popper {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <FieldInputEdit
            id={`${name}-popper-input`}
            type={type}
            value={value}
            onChange={onChange}
            onClose={onClick}
          />
        )}
      </Popper>
    </>
  );
}

export default FieldInput;
