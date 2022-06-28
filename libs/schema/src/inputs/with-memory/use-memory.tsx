import { useStateMachine } from 'little-state-machine';

import {
  createFormAction,
  setFormAction,
  updateFormAction,
  deleteFormAction,
  clearAllAction,
} from './store';

const useMemory = () =>
  useStateMachine({
    createFormAction,
    setFormAction,
    updateFormAction,
    deleteFormAction,
    clearAllAction,
  });

export default useMemory;
