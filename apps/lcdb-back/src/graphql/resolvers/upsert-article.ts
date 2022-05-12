import { graphql } from '@keystone-6/core';
import { KeystoneContext } from '@keystone-6/core/types';
import { isEmpty } from 'lodash';

export const IntFieldUpdateOperationsInput = graphql.inputObject({
  name: 'IntQuantityUpdateOperationsInput',
  fields: {
    set: graphql.arg({
      type: graphql.Int
    }),
    increment: graphql.arg({
      type: graphql.Int
    }),
    decrement: graphql.arg({
      type: graphql.Int
    })
  }
});

export const upsertArticleInput = {
  extend: (base: graphql.BaseSchemaMeta) =>
    graphql.inputObject({
      name: 'UpsertStockUnitInput',
      fields: {
        createOrConnect: graphql.arg({
          type: graphql.nonNull(base.inputObject('StockUnitCreateInput'))
        }),
        update: graphql.arg({
          type: graphql.nonNull(IntFieldUpdateOperationsInput)
        })
      }
    })
};

const upsertArticle = {
  extend: (base: graphql.BaseSchemaMeta) =>
    graphql.field({
      type: base.object('Article'),
      args: {
        data: graphql.arg({
          type: graphql.nonNull(upsertArticleInput.extend(base))
        }),
        where: graphql.arg({
          type: graphql.nonNull(base.inputObject('ArticleWhereInput'))
        })
      },
      async resolve(source, { data, where }, context: KeystoneContext) {
        const { create, connect, update } = data as any;

        const stockUnit = await context.query.StockUnit.findMany({
          where: where,
          query: 'id quantity'
        });

        // Stock unit already exist -> merge
        if (!isEmpty(stockUnit)) {
          const _stockUnit: any = stockUnit[0];
          let quantity = parseInt(_stockUnit.quantity, 10);
          if ('increment' in update) {
            quantity += update.increment;
          }
          if ('decrement' in update) {
            quantity -= update.decrement;
          }
          if ('set' in update) {
            quantity = update.set;
          }
          return await context.prisma.StockUnit.updateOne({
            where: { id: _stockUnit.id as string },
            data: {
              quantity: {
                create: {
                  value: quantity
                }
              }
            }
          });
        }

        // Stock unit does not exist -> Check article
        const articles = await context.query.Article.findMany({
          where: where
        });

        // Article doesn't exist. We create both article and stock unit in a single request.
        if (!isEmpty(articles)) {
          const articleId = articles[0].id;
          output = await context.prisma.StockUnit.update({
            data: { ...update },
            where: { id: articleId }
          });
          return;
        } else {
          output = await context.prisma.StockUnit.create({
            data: { ...create }
          });
        }

        return output;
      }
    })
};

export default upsertArticle;
