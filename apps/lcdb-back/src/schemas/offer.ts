import { list, graphql } from '@keystone-6/core';
import { relationship, text, integer, virtual } from '@keystone-6/core/fields';
import { trackerCreate } from './fields/tracker-create';

export const Offer = list({
  fields: {
    pid: text(),
    status: text(),
    prices: relationship({ ref: 'PriceOffer.offer', many: true }),
    eligibleQuantity: integer(),
    stockUnit: relationship({ ref: 'StockUnit.offers', many: false }),
    plateform: relationship({ ref: 'Plateform.offers', many: false }),
    lastPrice: virtual({
      field: (lists) =>
        graphql.field({
          type: lists.PriceOffer.types.output,
          async resolve(item: any, args, context) {
            const { prices } = await context.query.Offer.findOne({
              where: { id: item.id.toString() },
              query: `prices(
                    orderBy: { createdAt: desc }
                    take: 1
                  ) { id }`
            });
            if (prices.length > 0) {
              return context.db.PriceOffer.findOne({
                where: { id: prices[0].id }
              });
            }
          }
        }),
      ui: { query: '{ value createdAt }' }
    }),
    ...trackerCreate
  }
});
