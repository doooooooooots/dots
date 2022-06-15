import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { isEmpty } from 'lodash';

function useInput(config: {
  name: string;
  type: string;
  multiple: boolean;
  initialValue: unknown[] | string | number | null;
}) {
  const {
    name,
    type = 'string',
    multiple = false,
    initialValue = null,
  } = config;

  const [input, setInput] = useState(
    initialValue ?? type === 'number' ? null : ''
  ) as [
    any[] | string | null,
    Dispatch<SetStateAction<typeof config.initialValue>>
  ];

  const handleChange = useCallback(
    (newValue) => {
      if (type === 'number') {
        if (newValue !== null) {
          setInput(parseInt(newValue, 10));
        }
      } else {
        setInput(newValue);
      }
    },
    [type]
  );

  const handleChangeSelect = useCallback(
    (_, newValue) => {
      handleChange(newValue);
    },
    [handleChange]
  );

  const handleChangeClick = useCallback(
    (event) => {
      handleChange(event.target.value);
    },
    [handleChange]
  );

  const handleReset = useCallback(() => {
    setInput('');
  }, []);

  const handleChangeList = useCallback(
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
      setInput(_newValue);

      if (typeof submitFunc === 'function') {
        if (!multiple && !isEmpty(_newValue)) {
          submitFunc(_newValue.pop());
        }
      }
    },
    [multiple]
  );

  const handleDeleteList = useCallback(
    (id) => () => {
      setInput((current) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _current = [...(current as any[])];
        const elem = _current.find((item) => item.id === id);
        const index = _current.indexOf(elem);
        _current.splice(index, 1);
        return _current;
      });
    },
    []
  );

  return {
    id: `${name}-input-field`,
    input,
    setInput,
    onChange: handleChange,
    onChangeSelect: handleChangeSelect,
    onChangeClick: handleChangeClick,
    onChangeList: handleChangeList,
    onDeleteList: handleDeleteList,
    onReset: handleReset,
  };
}

export default useInput;
