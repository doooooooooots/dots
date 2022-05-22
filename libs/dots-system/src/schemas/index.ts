import storage from './src/storage';
import game from './src/game';
import stockUnit from './src/stock-unit';
import article from './src/article';
import condition from './src/condition';
import offer from './src/offer';

const ENTITIES = {
  game,
  article,
  storage,
  stockUnit,
  condition,
  offer,
};

// [ ](Adrien): Move logic to own file && clean logic
//? Allow to get indexed column -- for relationships
const getIndexColumn = (singular: EntityKey) => {
  const fields = Object.entries(ENTITIES[singular].fields);
  for (let index = 0; index < fields.length; index++) {
    const [fieldName, field] = fields[index];
    if ('isIndexed' in field && field.isIndexed === true) {
      return fieldName;
    }
  }
  return 'id';
};
export type EntityKey = keyof typeof ENTITIES;
export default ENTITIES;
export { getIndexColumn };
