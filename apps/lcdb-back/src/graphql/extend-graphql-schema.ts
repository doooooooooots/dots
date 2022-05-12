import { graphql } from '@keystone-6/core';
import upsertArticle from './resolvers/upsert-article';

export const extendGraphqlSchema = graphql.extend((base) => {
  return {
    mutation: {
      upsertArticle: upsertArticle.extend(base)
    },
    query: {
      // recentPosts: graphql.field({
      //   type: graphql.list(graphql.nonNull(base.object('Post'))),
      //   args: {
      //     id: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
      //     days: graphql.arg({ type: graphql.nonNull(graphql.Int), defaultValue: 7 })
      //   },
      //   resolve(source, { id, days }, context) {
      //     // Create a date string <days> in the past from now()
      //     const cutoff = new Date(new Date().setUTCDate(new Date().getUTCDate() - days)).toISOString();
      //     // Note we use `context.db.Post` here as we have a return type
      //     // of [Post], and this API provides results in the correct format.
      //     // If you accidentally use `context.query.Post` here you can expect problems
      //     // when accessing the fields in your GraphQL client.
      //     return context.db.Post.findMany({
      //       where: { author: { id: { equals: id } }, publishDate: { gt: cutoff } }
      //     });
      //   }
      // }),
      // stats: graphql.field({
      //   type: Statistics,
      //   args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
      //   resolve(source, { id }) {
      //     return { authorId: id };
      //   }
      // })
    }
  };
});
