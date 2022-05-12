import { graphql } from '@keystone-6/core';

export const createStatistics = (base: graphql.BaseSchemaMeta) =>
  graphql.object<{ authorId: string }>()({
    name: 'Statistics',
    fields: {
      draft: graphql.field({
        type: graphql.Int,
        resolve({ authorId }, args, context) {
          return context.query.Post.count({
            where: { author: { id: { equals: authorId } }, status: { equals: 'draft' } }
          });
        }
      }),
      published: graphql.field({
        type: graphql.Int,
        resolve({ authorId }, args, context) {
          return context.query.Post.count({
            where: { author: { id: { equals: authorId } }, status: { equals: 'published' } }
          });
        }
      }),
      latest: graphql.field({
        type: base.object('Post'),
        async resolve({ authorId }, args, context) {
          const [post] = await context.db.Post.findMany({
            take: 1,
            orderBy: { publishDate: 'desc' },
            where: { author: { id: { equals: authorId } } }
          });
          return post;
        }
      })
    }
  });
