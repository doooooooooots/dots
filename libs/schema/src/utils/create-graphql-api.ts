// FIND
import findOneBuilder from '../graphql/find-one-builder';
import findManyBuilder from '../graphql/find-many-builder';
// CREATE
import createOneBuilder from '../graphql/create-one-builder';
import createManyBuilder from '../graphql/create-many-builder';
// DELETE
import deleteOneBuilder from '../graphql/delete-one-builder';
import deleteManyBuilder from '../graphql/delete-many-builder';
// UPDATE
import updateOneBuilder from '../graphql/update-one-builder';
import updateManyBuilder from '../graphql/update-many-builder';
// AGGREGATES
import countBuilder from '../graphql/count-builder';

// Types
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { GraphQlApiType } from '../types/graphql-api';

const createGraphQlApi = (singular: string): GraphQlApiType => {
  return {
    [GRAPHQL_ACTIONS.FindOne]: findOneBuilder(singular),
    [GRAPHQL_ACTIONS.CreateOne]: createOneBuilder(singular),
    [GRAPHQL_ACTIONS.UpdateOne]: updateOneBuilder(singular),
    [GRAPHQL_ACTIONS.DeleteOne]: deleteOneBuilder(singular),
    [GRAPHQL_ACTIONS.FindMany]: findManyBuilder(singular),
    [GRAPHQL_ACTIONS.CreateMany]: createManyBuilder(singular),
    [GRAPHQL_ACTIONS.UpdateMany]: updateManyBuilder(singular),
    [GRAPHQL_ACTIONS.DeleteMany]: deleteManyBuilder(singular),
    [GRAPHQL_ACTIONS.Count]: countBuilder(singular),
  };
};

export default createGraphQlApi;
