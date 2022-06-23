import { useCallback, useState } from 'react';
import { isArray, isEmpty } from 'lodash';

interface ConfigType<T> {
  id: string;
  name: string;
  type: string;
  multiple: boolean;
  value: T[];
}

type OptionType = {
  id?: string;
  key: string;
  value: number;
  label: string;
  index: number;
};

function useAutocomplete(config: ConfigType<OptionType>) {
  const { name, value, multiple = false } = config;

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
    },
    [multiple]
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
