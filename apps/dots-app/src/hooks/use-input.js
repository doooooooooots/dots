import { useCallback, useState } from 'react';

export default function useInput(initialValue, callback) {
  const [input, setInput] = useState(initialValue);

  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  return {
    input,
    onChange: handleChange,
  };
}
