import { useState, useCallback } from "react";

const useDialog = (init = false) => {
  const [isOpen, setIsOpen] = useState(init);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useDialog;
