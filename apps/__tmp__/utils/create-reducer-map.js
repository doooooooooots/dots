import { isEmpty, isObject, merge } from 'lodash';

export default function createReducerMap(initialState, customMethods = {}) {
  const output = {
    set(state, action) {
      const newState = action.payload;
      return newState;
    },
    toggle(state, action) {
      const key = action.payload;
      const path = key.split('.');
      if (path.length > 1) {
        let obj = state;
        while (path.length > 1) obj = obj[path.shift()];
        obj[path[0]] = !obj[path[0]];
      } else {
        state[key] = !state[key];
      }
    },
    reset() {
      return { ...initialState };
    },
    mergeValue(state, action) {
      const { key, values } = action.payload;
      const path = key.split('.');
      if (path.length > 1) {
        let obj = state;
        while (path.length > 1) obj = obj[path.shift()];
        merge(obj[path[0]], values);
      } else {
        merge(state[key], values);
      }
    },
    updateValue(state, action) {
      const { key, values } = action.payload;
      const path = key.split('.');
      if (path.length > 1) {
        let obj = state;
        while (path.length > 1) obj = obj[path.shift()];
        if (isObject(obj[path[0]])) {
          obj[path[0]] = { ...obj[path[0]], ...values };
        } else {
          obj[path[0]] = values;
        }
      } else {
        if (isObject(state[key])) {
          state[key] = { ...state[key], ...values };
        } else {
          state[key] = values;
        }
      }
    },
    setValue(state, action) {
      const { key, value } = action.payload;
      const path = key.split('.');
      if (path.length > 1) {
        let obj = state;
        while (path.length > 1) obj = obj[path.shift()];
        obj[path[0]] = value;
      } else {
        state[key] = value;
      }
    }
  };
  if (!isEmpty(customMethods)) return { ...output, ...customMethods };
  return output;
}
