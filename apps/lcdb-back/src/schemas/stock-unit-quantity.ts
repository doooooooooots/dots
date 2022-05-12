import { list } from '@keystone-6/core';
import { integer } from '@keystone-6/core/fields';
import { trackerCreate } from './fields/tracker-create';
import { relationship } from '@keystone-6/core/fields';

export const StockUnitQuantity = list({
  fields: {
    value: integer(),
    stockUnit: relationship({ ref: 'StockUnit.quantityVariations', many: false }),
    ...trackerCreate
  }
});
