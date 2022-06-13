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

  //* Input
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = useCallback((_, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  //* Selected values
  const [value, setValue] = useState(defaultValue || []);
  const [pendingValue, setPendingValue] = useState([]);

  const handleChange = useCallback(
    (event, newValue, reason) => {
      if (
        event.type === 'keydown' &&
        event.key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }
      setPendingValue(
        multiple ? newValue : newValue.length === 1 ? newValue : [newValue[1]]
      );
    },
    [multiple]
  );
  const handleDelete = useCallback(
    (index) => () => {
      setPendingValue((current) => {
        const _current = [...current];
        _current.splice(index, 1);
        return _current;
      });
    },
    []
  );

  //* Open popper
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
    onDelete: handleDelete,
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
