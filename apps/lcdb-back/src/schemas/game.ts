import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const Game = list({
  fields: {
    name: text(),
    code: text({ isIndexed: 'unique' }),
    productModels: relationship({ ref: 'ProductModel.game', many: true }),
    expansions: relationship({ ref: 'Expansion.game', many: true }),
    idMkm: text({ isIndexed: 'unique' })
  }
});
