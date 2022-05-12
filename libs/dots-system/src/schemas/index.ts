import storage from './src/storage';
import stockUnit from './src/stock-unit';
import product from './src/product';
import article from './src/article';
import category from './src/category';

const ENTITIES = {
  storage,
  stockUnit,
  product,
  article,
  category,
};

export type EntityKey = keyof typeof ENTITIES;
export default ENTITIES;
