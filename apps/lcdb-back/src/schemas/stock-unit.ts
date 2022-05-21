import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { integer } from '@keystone-6/core/fields';

export const StockUnit = list({
  fields: {
    quantity: integer({
      defaultValue: 0,
      access: {
        update: () => false,
      },
    }),
    quantityVariations: relationship({
      ref: 'StockUnitQuantity.stockUnit',
      many: true,
      hooks: {
        afterOperation: async ({ item, context }) => {
          // Prevent operation after item has been deleted
          if (!item) return;

          const { quantityVariations } = await context.query.StockUnit.findOne({
            where: { id: item.id.toString() },
            query: `quantityVariations(
                        orderBy: { createdAt: desc }
                        take: 1
                      ) { id value }`,
          });
          if (quantityVariations.length > 0) {
            await context.prisma.stockUnit.update({
              where: { id: item.id.toString() },
              data: { quantity: quantityVariations[0].value },
            });
          } else {
            await context.prisma.stockUnit.update({
              where: { id: item.id.toString() },
              data: { quantity: 0 },
            });
          }
        },
      },
    }),
    article: relationship({ ref: 'Article.stockUnits', many: false }),
    storage: relationship({ ref: 'Storage.stockUnits', many: false }),
    offers: relationship({
      ref: 'Offer.stockUnit',
      many: true,
      ui: {
        // DISPLAY SELECT
        // displayMode: 'select',
        // labelField: 'pid',

        // -- DISPLAY CARD
        displayMode: 'cards',
        cardFields: ['id', 'pid'],
        linkToItem: true,
        removeMode: 'disconnect',
        inlineCreate: { fields: ['pid', 'id'] },
        inlineEdit: { fields: ['pid'] },
        inlineConnect: true,

        // -- DISPLAY COUNT
        // displayMode: 'count',
      },
    }),
  },
});
