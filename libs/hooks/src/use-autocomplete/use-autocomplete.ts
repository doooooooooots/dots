import { useCallback, useState } from 'react';
import { isArray, isEmpty } from 'lodash';

function useAutocomplete(config: {
  id: string;
  name: string;
  type: string;
  multiple: boolean;
  value: string | number | null;
}) {
  const {
    id,
    name,
    value: _value = null,
    type = 'string',
    multiple = false,
  } = config;

  //* States
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
    },
    [value]
  );

  /**
   * User cancels his selection
   */
  const handleCancel = useCallback((_, reason) => {
    console.log(reason);
  }, []);

  /**
   * Render value for user
   */
  const handleChange = useCallback(
    (submitFunc) => (event: any, newValue: any, reason: string) => {
      if (
        event.type === 'keydown' &&
        event.key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }

      let _newValue;

      if (isEmpty(newValue)) _newValue = [];
      else _newValue = multiple ? newValue : [newValue.pop()];
      setPendingValue(_newValue);

      if (typeof submitFunc === 'function') {
        if (!multiple && !isEmpty(_newValue)) {
          submitFunc(_newValue.pop());
        }
      }
    },
    [multiple]
  );

  /**
   * User clicks on an element of the list
   */
  const onChange = handleChange(null);

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
    (id) => () => {
      setPendingValue((current) => {
        const _current = [...current];
        const elem = _current.find((item) => item.id === id);
        const index = _current.indexOf(elem);
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
    onChange: onChange,
    onCancel: handleCancel,
    onDelete: handleDelete,
    handleSubmit,
    handleChange,
    // user input
    // local value
    value,
    // popper
    onButtonClick: handleOpen,
    // utils & config
    multiple,
  };
}

export default useAutocomplete;
