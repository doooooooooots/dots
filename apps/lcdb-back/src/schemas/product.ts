import { list } from '@keystone-6/core';
import { relationship, text, integer } from '@keystone-6/core/fields';
import { mediaObject } from './fields/media-object';

export const Product = list({
  fields: {
    status: text(),
    number: text(),
    website: text(),
    locals: relationship({ ref: 'ProductLocal', many: true }),
    countSells: integer(),
    priceStrategy: integer(),
    image: mediaObject(),
    links: relationship({ ref: 'Link', many: true }),
    articles: relationship({ ref: 'Article.product', many: true }),
    expansion: relationship({ ref: 'Expansion.products', many: false }),
    productModel: relationship({ ref: 'ProductModel.products', many: false }),
    category: relationship({ ref: 'Category.products', many: false }),
    rarity: relationship({ ref: 'Rarity.products', many: false }),
    reconciliations: relationship({ ref: 'ProductReconciliation.productId', many: true })
  }
});
