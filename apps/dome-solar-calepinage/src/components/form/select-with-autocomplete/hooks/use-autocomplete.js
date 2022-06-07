// Hook (use-auth.js)
import usePopper from './use-popper';
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';

const autocompleteContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAutocomplete = () => {
  return useContext(autocompleteContext);
};

function useProvideAutocomplete(config = {}) {
  const { multiple = false, defaultValue = undefined } = config;

  const { id, anchorEl, open, onOpen, onClose } = usePopper();

  //-> Input
  const [inputValue, setInputValue] = useState('');

  //-> Selected values
  const [value, setValue] = useState(defaultValue || []);
  const [pendingValue, setPendingValue] = useState([]);

  const handleInputChange = useCallback((_, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  const handleChange = useCallback(
    (event, newValue, reason) => {
      if (
        event.type === 'keydown' &&
        event.key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }
      console.log(newValue);
      setPendingValue(
        multiple ? newValue : newValue.length === 1 ? newValue : [newValue[1]]
      );
    },
    [multiple]
  );

  //-> Open popper
  const handleClick = (event) => {
    setPendingValue(value);
    onOpen(event.currentTarget);
  };

  const handleCancel = useCallback((_, reason) => {
    if (reason === 'escape') {
      handleCancel();
    }
  }, []);

  const handleClose = () => {
    setValue(pendingValue);
    onClose();
  };

  useEffect(() => {
    return () => null;
  }, []);

  return {
    id,
    value,
    hasValue: value.length,
    inputValue,
    setInputValue,
    pendingValue,
    multiple,
    anchorEl,
    open,
    onOpen,
    onClose,
    onInputChange: handleInputChange,
    onChange: handleChange,
    onButtonClick: handleClick,
    onConfirm: handleClose,
    onCancel: handleCancel,
  };
}

export function ProvideAutocomplete({ children, config }) {
  const autocomplete = useProvideAutocomplete(config);
  return (
    <autocompleteContext.Provider value={autocomplete}>
      {children}
    </autocompleteContext.Provider>
  );
}
