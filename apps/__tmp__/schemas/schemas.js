import createSchema from '../../../../libs/schemas/src/utils/create-schema';

const tables = [
  ['storage', 'storages'],
  ['stockUnit', 'stockUnits'],
  ['article', 'articles'],
  ['product', 'products'],
  ['offer', 'offers'],
];

const context = tables.reduce(
  (acc, [singular, plurial]) => ({
    ...acc,
    [singular]: createSchema(singular, plurial),
  }),
  {}
);

export default context;
