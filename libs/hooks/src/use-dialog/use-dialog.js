import { useCallback } from 'react';
import { useDialogState } from './dialog-context';

const useDialog = () => {
  const [dialog, setDialog] = useDialogState();

  const handleChange = useCallback(
    (key) => (event) => {
      setDialog((current) => ({
        ...current,
        form: {
          ...current.form,
          [key]: event.target.value,
        },
      }));
    },
    [setDialog]
  );

  const handleOpen = useCallback(() => {
    setDialog((current) => ({
      ...current,
      open: true,
    }));
  }, [setDialog]);

  const handleClose = useCallback(() => {
    setDialog((current) => ({
      ...current,
      open: false,
    }));
  }, [setDialog]);

  return {
    isOpen: dialog.open,
    form: dialog.form,
    onOpen: handleOpen,
    onClose: handleClose,
    onChange: handleChange,
  };
};

export default useDialog;
