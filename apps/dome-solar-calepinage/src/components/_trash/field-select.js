import React from 'react';
import { ClickAwayListener, Divider } from '@mui/material';
import { useAutocomplete, bindToggle, bindPopper } from '@dots.cool/hooks';
import FieldInput from './input';
import Popper from '../../popper-styled';
import PopperContainer from '../../design-system/popper/popper-container';
import Autocomplete from '../../design-system/autocomplete/autocomplete';
import PopperActions from '../../design-system/popper/popper-actions';
import PopperInput from '../../design-system/popper/popper-input';

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
      <Popper {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <ClickAwayListener onClickAway={handleSubmit(onConfirm)}>
            <PopperContainer>
              <Autocomplete
                options={options}
                // Value
                value={pendingValue}
                onChange={handleChange(onConfirm)}
                // Input
                inputValue={inputValue}
                onInputChange={onInputChange}
                // Render
                renderInput={(params) => (
                  <PopperInput
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    onClear={onClear}
                    sx={[options.length < 10 && { opacity: 0, height: 0 }]}
                    autoFocus
                  />
                )}
                onClose={() => null}
                clearOnBlur={false}
                // disableCloseOnSelect
                // disableSort
              />
              <Divider />
              {multiple && (
                <PopperActions
                  onConfirm={handleSubmit(onConfirm)}
                  onCancel={onCancel}
                />
              )}
            </PopperContainer>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default FieldSelect;
