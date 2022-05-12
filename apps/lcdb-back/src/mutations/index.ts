import { graphQLSchemaExtension } from '@keystone-6/core';

const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
    }
  `,
  resolvers: {
    Mutation: {
    },
  },
});