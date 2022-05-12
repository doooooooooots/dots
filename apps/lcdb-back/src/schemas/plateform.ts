import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const Plateform = list({
  fields: {
    pid: text({ isIndexed: 'unique' }),
    name: text(),
    products: relationship({ ref: 'ProductReconciliation.plateform', many: true }),
    articles: relationship({ ref: 'ArticleReconciliation.plateform', many: true }),
    expansions: relationship({ ref: 'ExpansionReconciliation.plateform', many: true }),
    offers: relationship({ ref: 'Offer.plateform', many: true })
  }
});
