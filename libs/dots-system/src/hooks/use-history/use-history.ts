/* eslint-disable no-case-declarations */
import { useCallback, useEffect } from 'react';
import { useHistoryState } from './history-context';
import { HistoryItem } from './index.d';

// Hook
const useHistory = (initialPresent = null) => {
  const [state, dispatch] = useHistoryState();

  useEffect(() => {
    if (initialPresent) {
      dispatch({ type: 'CLEAR', payload: initialPresent });
    }
  }, [dispatch, initialPresent]);

  const canUndo = state.past.length > 1;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    } else {
      dispatch({ type: 'CLEAR', payload: initialPresent });
    }
  }, [canUndo, dispatch, initialPresent]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  const push = useCallback(
    (newPresent: HistoryItem) =>
      dispatch({ type: 'PUSH', payload: newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: 'CLEAR', payload: initialPresent }),
    [dispatch, initialPresent]
  );

  const goTo = useCallback(
    (index: number) => dispatch({ type: 'GOTO', payload: index }),
    [dispatch]
  );

  const close = useCallback(
    (index: number) => dispatch({ type: 'CLOSE', payload: index }),
    [dispatch]
  );

  // If needed we could also return past and future state
  return {
    state: state.present,
    push,
    undo,
    redo,
    close,
    goTo,
    clear,
    canUndo,
    canRedo,
    path: state.path?.join('.'),
    debug: state,
    history: state,
  };
};

export default useHistory;
