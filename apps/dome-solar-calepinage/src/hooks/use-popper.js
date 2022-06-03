import React, { useCallback } from 'react';

export default function usePopper(initialState) {
  const [open, setOpen] = React.useState(initialState);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setOpen((current) => !current);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    anchorEl,
    onOpen: handleOpen,
    onClose: handleClose,
  };
}
