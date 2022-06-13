import React from 'react';
import { ClickAwayListener, Divider } from '@mui/material';
import { useAutocomplete, bindToggle, bindPopper } from '@dots.cool/hooks';
import FieldInput from './field-input';
import Popper from '../../popper-styled';
import PopperContainer from '../../design-system/popper/popper-container';
import Autocomplete from '../../design-system/autocomplete/autocomplete';
import PopperActions from '../../design-system/popper/popper-actions';

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
    getOptionLabel,
    // Config
    variant,
    multiple,
  } = props;

  const {
    // Pending value
    pendingValue,
    onChange,
    onCancel,
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
      <Popper {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <ClickAwayListener onClickAway={handleSubmit(onConfirm)}>
            <PopperContainer>
              <Autocomplete
                options={options}
                // Value
                value={pendingValue}
                onChange={onChange}
                // Input
                inputValue={inputValue}
                onInputChange={onInputChange}
                // Render

                onClose={() => null}
                clearOnBlur={false}
                onClear={onClear}
                disableCloseOnSelect
                multiple
                open
              />
              <Divider />
              <PopperActions
                onConfirm={handleSubmit(onConfirm)}
                onCancel={onCancel}
              />
            </PopperContainer>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default FieldSelect;
