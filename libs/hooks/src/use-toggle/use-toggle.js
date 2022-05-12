import { useCallback, useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState([]);

  const handleToggle = useCallback((event, newValue) => {
    setToggle(newValue);
  }, []);

  return {
    toggle,
    onChange: handleToggle,
  };
};

export default useToggle;
