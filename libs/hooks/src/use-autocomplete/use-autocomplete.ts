import { useCallback, useState } from 'react';
import { last, isArray, isEmpty } from 'lodash';

function useAutocomplete(config: {
  id: string;
  name: string;
  type: string;
  multiple: boolean;
  value: unknown;
}) {
  const { name, value = [], multiple = false } = config;

  /**
   * Local values
   */
  const [input, setInput] = useState('');
  const [pendingValue, setPendingValue] = useState(
    isArray(value) ? [...value] : [value]
  );

  const handleInputChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const handleInputClear = useCallback((event) => {
    setInput('');
  }, []);

  /**
   * Render value for user
   */
  const handleChange = useCallback(
    (event: any, newValue: any, reason: string) => {
      if (
        event?.type === 'keydown' &&
        event?.key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }

      let _newValue;

      if (isEmpty(newValue)) _newValue = [];
      else _newValue = multiple ? newValue : [newValue.pop()];
      setPendingValue(_newValue);
    },
    [multiple]
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

  /**
   * Render value for user
   */
  const getValue = useCallback(() => {
    if (multiple) return pendingValue;
    if (pendingValue && pendingValue.length) return last(pendingValue);
    return null;
  }, [multiple, pendingValue]);

  return {
    id: `autocomplete-${name}`,
    input,
    handleInputChange,
    handleInputClear,
    pendingValue,
    getValue,
    handleChange,
    handleDelete,
  };
}

export default useAutocomplete;
