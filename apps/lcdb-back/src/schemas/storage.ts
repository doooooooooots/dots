import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { trackerCreate } from './fields/tracker-create';

export const Storage = list({
  fields: {
    name: text({ isIndexed: 'unique' }),
    game: relationship({ ref: 'Game', many: false }),
    stockUnits: relationship({ ref: 'StockUnit.storage', many: true }),
    expansions: relationship({ ref: 'Expansion.storages', many: true }),
    ...trackerCreate,
  },
});
