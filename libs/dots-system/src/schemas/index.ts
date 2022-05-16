import storage from './src/storage';
import game from './src/game';

const ENTITIES = {
  storage,
  game,
};

export type EntityKey = keyof typeof ENTITIES;
export default ENTITIES;
