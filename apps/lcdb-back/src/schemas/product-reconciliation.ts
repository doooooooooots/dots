import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const ProductReconciliation = list({
  fields: {
    plateform: relationship({ ref: 'Plateform.products', many: false }),
    productId: relationship({ ref: 'Product.reconciliations', many: false }),
    localPid: text()
  }
});
