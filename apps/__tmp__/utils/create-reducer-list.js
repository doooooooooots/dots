import { difference, isEmpty, merge } from 'lodash';
import { objFromArray } from '@utils/obj-from-array';

export default function createReducerList(key, initialState, customMethods = {}) {
  const output = {
    resetList(state) {
      state[key] = initialState;
    },
    get(state, action) {
      const entry = action.payload;
      state[key].byId[entry.id] = entry;
      state[key].allIds = [...state[key].allIds, entry.id];
    },
    push(state, action) {
      const entry = action.payload;
      state[key].byId[entry.id] = entry;
      state[key].allIds.push(entry.id);
    },
    getMultiple(state, action) {
      const entries = action.payload;
      state[key].byId = objFromArray(entries);
      state[key].allIds = Object.keys(state[key].byId);
    },
    pushMultiple(state, action) {
      const entries = action.payload;
      const byId = objFromArray(entries);
      const allIds = Object.keys(byId);

      state[key].byId = { ...state[key].byId, ...byId };
      state[key].allIds = [...state[key].allIds, ...allIds];
    },
    update(state, action) {
      const entry = action.payload;
      state[key].byId[entry.id] = { ...state[key].byId[entry.id], ...entry };
    },
    updateMultiple(state, action) {
      const entries = action.payload;
      const byId = objFromArray(entries);
      merge(state[key].byId, byId);
    },
    delete(state, action) {
      const entryId = action.payload;

      delete state[key].byId[entryId];
      state[key].allIds = state[key].allIds.filter((_entryId) => _entryId !== entryId);
    },
    deleteMultiple(state, action) {
      const entryIds = action.payload;
      entryIds.forEach((id) => {
        delete state[key].byId[id];
      });
      state[key].allIds = difference(state[key].allIds, entryIds);
    }
  };

  if (!isEmpty(customMethods)) return { ...output, ...customMethods };
  return output;
}
