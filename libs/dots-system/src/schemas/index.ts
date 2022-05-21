import storage from './src/storage';
import game from './src/game';
import stockUnit from './src/stock-unit';

const ENTITIES = {
  storage,
  stockUnit,
  game,
};

export type EntityKey = keyof typeof ENTITIES;
export default ENTITIES;
