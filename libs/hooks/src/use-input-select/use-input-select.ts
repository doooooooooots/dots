import { useCallback, useState } from 'react';

function useInputSelect(name: string, initValue: string) {
  const [value, setValue] = useState(initValue);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return {
    id: `${name}-select-field`,
    value,
    setValue,
    onChange: handleChange,
    onClear: handleClear,
  };
}

export default useInputSelect;
