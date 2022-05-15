import storage from './src/storage';

const ENTITIES = {
  storage,
};

export type EntityKey = keyof typeof ENTITIES;
export default ENTITIES;
