import { useCallback, useState } from 'react';
import { isArray, isEmpty, last } from 'lodash';

interface ConfigType<T> {
  id: string;
  name: string;
  type: string;
  multiple: boolean;
  value: T[];
  onChange?: (data: unknown) => void;
}

type OptionType = {
  id?: string;
  key: string;
  value: number;
  label: string;
  index: number;
};

function useAutocomplete(config: ConfigType<OptionType>) {
  const { name, value, multiple = false, onChange } = config;

  /**
   * Local values
   */
  const [pendingValue, setPendingValue] = useState<OptionType[]>(
    isArray(value) ? value : [value]
  );

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

      if (typeof onChange === 'function') {
        const getValue = (value: unknown[]) => {
          if (isEmpty(value)) return multiple ? [] : null;
          if (multiple) return value;
          return last(value);
        };
        onChange(getValue(_newValue));
      }
    },
    [multiple, onChange]
  );

  /**
   * User clicks on delete in selected element list
   */
  const handleDelete = useCallback(
    (key) => () => {
      setPendingValue((current) => {
        const _current = [...current];
        const elem = _current.find((item) => item.key || item.id === key);
        if (elem) {
          const index = _current.indexOf(elem);
          _current.splice(index, 1);
        }
        return _current;
      });
    },
    []
  );

  return {
    id: `autocomplete-${name}`,
    pendingValue,
    handleChange,
    handleDelete,
  };
}

export default useAutocomplete;
