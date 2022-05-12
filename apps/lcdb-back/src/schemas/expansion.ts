import { list } from '@keystone-6/core';
import { relationship, text, timestamp, checkbox } from '@keystone-6/core/fields';

export const Expansion = list({
  fields: {
    abbreviation: text(),
    slug: text(),
    icon: text(),
    dateRelease: timestamp(),
    isReleased: checkbox(),
    areProductsLoaded: checkbox({ defaultValue: false }),
    game: relationship({ ref: 'Game.expansions', many: false }),
    products: relationship({ ref: 'Product.expansion', many: true }),
    storages: relationship({ ref: 'Storage.expansions', many: true }),
    locals: relationship({ ref: 'ExpansionLocal.expansion', many: true }),
    reconciliations: relationship({ ref: 'ExpansionReconciliation.expansionId', many: true }),
    updatedAt: timestamp({ db: { updatedAt: true } })
  }
});
