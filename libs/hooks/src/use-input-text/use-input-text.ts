import { useCallback, useState } from 'react';

function useInputText(name: string, initValue: string) {
  const [input, setInput] = useState(initValue);

  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  return {
    id: `${name}-input-field`,
    input,
    setInput,
    onChange: handleChange,
    onClear: handleClear,
  };
}

export default useInputText;
