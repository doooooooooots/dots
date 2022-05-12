import { useStateMachine } from 'little-state-machine';

import {
  deleteFormAction,
  setFormAction,
  updateFormAction,
  clearAllAction,
} from './store';

const useMemory = () =>
  useStateMachine({
    deleteFormAction,
    setFormAction,
    updateFormAction,
    clearAllAction,
  });

export default useMemory;
