import React, { useContext, createContext, useCallback, useState } from 'react';

const popperContext = createContext();

export const usePopper = () => {
  return useContext(popperContext);
};

function useProvidePopper(initalState) {
  const { id: _id, anchorEl: _anchorEl } = initalState;
  const [anchorEl, setAnchorEl] = useState(_anchorEl);
  const [value, setValue] = useState('');
  const [pendingValue, setPendingValue] = useState('');

  const open = Boolean(anchorEl);
  const id = open ? _id : undefined;

  const handleOpen = useCallback(
    (_anchorEl) => {
      setPendingValue(value);
      setAnchorEl(_anchorEl);
    },
    [value]
  );

  const handleClickButtonOpen = useCallback(
    (event) => {
      handleOpen(event.target);
    },
    [handleOpen]
  );

  const handleChange = useCallback((event) => {
    setPendingValue(event.target.value);
  }, []);

  const handleClose = useCallback(() => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  }, [anchorEl]);

  const handleConfirm = useCallback(() => {
    setValue(pendingValue);
    handleClose();
  }, [handleClose, pendingValue]);

  const handleResetPendingValue = useCallback(() => {
    setPendingValue('');
  }, []);

  return {
    id,
    open,
    anchorEl,
    value,
    pendingValue,
    setPendingValue,
    onOpen: handleOpen,
    onChange: handleChange,
    onButtonClick: handleClickButtonOpen,
    onClose: handleClose,
    onConfirm: handleConfirm,
    onResetValue: handleResetPendingValue,
  };
}

export function ProvidePopper({
  children,
  initalState = {
    id: 'dots-popper',
    anchorEl: null,
  },
}) {
  const popper = useProvidePopper(initalState);

  return (
    <popperContext.Provider value={popper}>{children}</popperContext.Provider>
  );
}
