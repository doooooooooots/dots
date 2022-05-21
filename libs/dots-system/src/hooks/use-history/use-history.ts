/* eslint-disable no-case-declarations */
import { useCallback, useEffect } from 'react';
import { useHistoryState } from './history-context';
import { HistoryItem } from './index.d';

const GLUE = '.';

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

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch]);

  const goTo = useCallback(
    (index: number) => dispatch({ type: 'GOTO', payload: index }),
    [dispatch]
  );

  const goBackTo = useCallback(
    (id: string) => dispatch({ type: 'GOBACKTO', payload: id }),
    [dispatch]
  );

  const close = useCallback(
    (index: number) => dispatch({ type: 'CLOSE', payload: index }),
    [dispatch]
  );

  const getCurrentPath = (glue: string) => {
    if (!state.present) return '';
    const presentPath = state.present.path;
    const presentIndex = state.paths.indexOf(presentPath);
    const currentPath = state.paths.slice(0, presentIndex);
    return currentPath.join(glue);
  };

  // If needed we could also return past and future state
  return {
    present: state.present,
    currentPath: getCurrentPath(GLUE),
    // Actions
    push,
    undo,
    redo,
    close,
    goTo,
    goBackTo,
    clear,
    canUndo,
    canRedo,
    // Debug
    debug: state,
    history: state,
  };
};

export default useHistory;
