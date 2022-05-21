import { graphql, list } from '@keystone-6/core';
import { relationship, text, checkbox, virtual } from '@keystone-6/core/fields';
import { updatedAt } from './fields/tracker-date';
import { updatedBy } from './fields/tracker-user';

export const Article = list({
  fields: {
    status: text(),
    product: relationship({ ref: 'Product.articles', many: false }),
    condition: relationship({ ref: 'Condition.articles', many: false }),
    language: relationship({ ref: 'Language', many: false }),
    priceSuggested: relationship({ ref: 'Price', many: true }),
    stockUnits: relationship({ ref: 'StockUnit.article', many: true }),
    reconciliations: relationship({
      ref: 'ArticleReconciliation.articleId',
      many: true,
    }),
    ...updatedAt,
    ...updatedBy,
    //--
    isSigned: checkbox(),
    isFirstEd: checkbox(),
    isAltered: checkbox(),
    isFoil: checkbox(),
    isReverseHolo: checkbox(),
    isPlayset: checkbox(),
    // [ ](Adrien): create aggregate logic
    aggregateCount: virtual({
      field: graphql.field({
        type: graphql.Int,
        args: { something: graphql.arg({ type: graphql.Int }) },
        resolve(item, args, context, info) {
          return 0;
        },
      }),
    }),
  },
});
