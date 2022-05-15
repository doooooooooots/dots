import { useCallback } from 'react';
import { useMap } from 'react-use';

const useConfirmDialog = (
  initalState = { open: false, action: null, target: null }
) => {
  const [dialog, { set, reset }] = useMap(initalState);

  const onOpen = useCallback(
    (action = null, target = null) => {
      set('open', true);
      if (action) {
        set('action', action);
      }
      if (target) {
        set('target', target);
      }
    },
    [set]
  );

  const onActionClick = useCallback(
    (action = null, target = null) =>
      () => {
        onOpen(action, target);
      },
    [onOpen]
  );

  const onClose = useCallback(() => {
    set('open', false);
    setTimeout(() => {
      reset();
    }, 300);
  }, [set, reset]);

  return {
    open: dialog.open,
    action: dialog.action,
    target: dialog.target,
    onActionClick,
    onOpen,
    onClose,
  };
};

export default useConfirmDialog;
