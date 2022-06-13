import React, { useCallback } from 'react';

export default function usePopper(
  initalState = {
    id: 'dots-popper',
    anchorEl: null,
  }
) {
  const [anchorEl, setAnchorEl] = React.useState(initalState.anchorEl);

  const open = Boolean(anchorEl);
  const id = open ? initalState.id : undefined;

  const handleOpen = useCallback((_anchorEl) => {
    setAnchorEl(_anchorEl);
  }, []);

  const handleClose = useCallback(() => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  }, [anchorEl]);

  return {
    id,
    open,
    anchorEl,
    onOpen: handleOpen,
    onClose: handleClose,
  };
}
