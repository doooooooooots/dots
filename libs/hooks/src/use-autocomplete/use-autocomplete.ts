import { useCallback, useState } from 'react';
import { isArray, isEmpty } from 'lodash';

import useInput from '../use-input/use-input';

import {
  usePopupState,
  bindToggle,
  bindTrigger,
  bindPopover,
  bindPopper,
  Variant,
} from 'material-ui-popup-state/hooks';

function useAutocomplete(config: {
  id: string;
  name: string;
  type: string;
  variant: Variant;
  multiple: boolean;
  value: string | number | null;
}) {
  const {
    id,
    name,
    value: _value = null,
    type = 'string',
    variant = 'popper',
    multiple = false,
  } = config;

  const popupState = usePopupState({
    variant,
    popupId: `${variant}-select-${name}`,
  });
  const { anchorEl, open, close, isOpen } = popupState;
  const { onClick } = bindToggle(popupState);

  //* States
  const {
    input: inputValue,
    onReset,
    onChange: handleInputChange,
  } = useInput({
    type,
  });
  const [value, setValue] = useState(
    _value && isArray(_value) ? [..._value] : _value ? [_value] : []
  );
  const [pendingValue, setPendingValue] = useState([] as typeof value);

  //* Actions
  /**
   * User clicks on trigger or toggle button
   */
  const handleOpen = useCallback(
    (event) => {
      setPendingValue(value);
      onReset();
      onClick(event);
    },
    [value, onReset, onClick]
  );

  /**
   * User clicks on an element of the list
   */
  const handleChange = useCallback(
    (event, newValue, reason) => {
      if (
        event.type === 'keydown' &&
        event.key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }

      let _newValue;
      if (isEmpty(newValue)) _newValue = [];
      else
        _newValue = multiple
          ? newValue
          : newValue.length === 1
          ? newValue
          : [newValue[1]];

      setPendingValue(_newValue);
    },
    [multiple]
  );

  /**
   * User cancels his selection
   */
  const handleCancel = useCallback(
    (_, reason) => {
      close();
    },
    [close]
  );

  /**
   * Render value for user
   */
  const handleSubmit = useCallback(
    (submitFunc) => () => {
      setValue(pendingValue);

      if (typeof submitFunc === 'function') {
        if (multiple) submitFunc(pendingValue);
        else {
          if (pendingValue && pendingValue.length) submitFunc(pendingValue[0]);
          else submitFunc(null);
        }
      }
      close();
    },
    [close, multiple, pendingValue]
  );

  /**
   * User clicks on delete in selected element list
   */
  const handleDelete = useCallback(
    (index) => () => {
      setPendingValue((current) => {
        const _current = [...current];
        _current.splice(index, 1);
        return _current;
      });
    },
    []
  );

  return {
    id,
    // pending value
    pendingValue,
    onChange: handleChange,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onClear: onReset,
    handleSubmit,
    // user input
    inputValue,
    onInputChange: handleInputChange,
    // local value
    value,
    // popper
    anchorEl,
    popupState,
    isOpen,
    open,
    close,
    onButtonClick: handleOpen,
    // utils & config
    multiple,
  };
}

export default useAutocomplete;
export { bindToggle, bindTrigger, bindPopover, bindPopper };
