import { createReducerContext } from 'react-use';
import {
  HistoryAction,
  HistoryItem,
  HistoryState,
} from './history-context-types';

const initialState: HistoryState = {
  // Array of path to store global paths (allow tabs)
  path: [],
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};

const reducer = (state: HistoryState, action: HistoryAction): HistoryState => {
  const { path, past, present, future } = state;
  const combined = [...past, present, ...future].filter(
    (id) => id
  ) as HistoryItem[];

  switch (action.type) {
    case 'UNDO': {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      const newPath = path.slice(0, path.length - 1);
      return {
        path: newPath,
        past: newPast,
        present: previous,
        future: [present as HistoryItem, ...future],
      };
    }

    case 'REDO': {
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        path: [...path, next.path],
        past: [...(past as HistoryItem[]), present as HistoryItem],
        present: next,
        future: newFuture,
      };
    }

    case 'PUSH': {
      const newPresent = action.payload as HistoryItem;

      if (!newPresent) {
        return state;
      }

      if (newPresent === present) {
        return state;
      }

      return {
        path: [...path, newPresent.path],
        past: combined,
        present: newPresent,
        future: [],
      };
    }

    case 'GOTO': {
      const index = action.payload as number;

      return {
        path: path,
        past: combined.slice(0, index),
        present: combined[index],
        future: combined.slice(index + 1),
      };
    }

    case 'CLOSE': {
      const indexClose = action.payload as number;
      combined.splice(indexClose, 1);
      path.splice(indexClose, 1);
      const currentIndex = Math.min(combined.length - 1, past.length);

      return {
        path: path,
        past: combined.slice(0, currentIndex),
        present: combined[currentIndex],
        future: combined.slice(currentIndex + 1),
      };
    }

    case 'CLEAR': {
      const initialPresent = action.payload as HistoryItem;
      return {
        ...initialState,
        present: initialPresent,
      };
    }
  }
  return state;
};

const [useHistoryState, SharedHistoryProvider] = createReducerContext(reducer, {
  ...initialState,
});

export { useHistoryState };
export default SharedHistoryProvider;
