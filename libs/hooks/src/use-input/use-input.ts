import { Dispatch, SetStateAction, useCallback, useState } from 'react';

function useInput({
  type,
  defaultValue,
}: {
  type: string;
  defaultValue?: unknown;
}) {
  const [input, setInput] = useState(
    defaultValue ?? type === 'number' ? null : ''
  ) as [string | null, Dispatch<SetStateAction<string | null | number>>];

  const handleChange = useCallback(
    (_, newValue) => {
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

  const handleChangeEvent = useCallback(
    (event) => {
      const newValue = event.target.value;
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

  const handleReset = useCallback(() => {
    setInput('');
  }, []);

  return {
    input,
    setInput,
    onChange: handleChange,
    onChangeEvent: handleChangeEvent,
    onReset: handleReset,
  };
}

export default useInput;
