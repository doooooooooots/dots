import React from 'react';
import { ClickAwayListener, Divider } from '@mui/material';
import { useAutocomplete, bindToggle, bindPopper } from '@dots.cool/hooks';
import FieldInput from './field-text';
import Popper from '../dots-system/components/field-popper-styled';

function FieldSelect(props) {
  const {
    // Field input
    name,
    label,
    icon,
    type,
    value,
    onConfirm,
    // Autocomplete
    options,
    // Config
    variant,
    multiple,
  } = props;

  const {
    // Pending value
    pendingValue,
    onCancel,
    handleChange,
    handleSubmit,
    // User input
    inputValue,
    onInputChange,
    onClear,
    // Local value
    value: localValue,
    // Popper
    popupState,
    isOpen,
    onButtonClick,
  } = useAutocomplete({
    id: `field-select-${name}`,
    name,
    type,
    value,
    variant,
    multiple,
  });

  return (
    <>
      <FieldInput
        name={name}
        label={label}
        icon={icon}
        type={type}
        value={localValue}
        readOnly
        isActive={isOpen}
        {...bindToggle(popupState)}
        onClick={onButtonClick}
      />
      <Popper {...bindPopper(popupState)} placement="bottom-start"></Popper>
    </>
  );
}

export default FieldSelect;
