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
import pluralize from 'pluralize';

// Types
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { GraphQlApiType } from './create-graphql-api.d';

const createGraphQlApi = (singular: string): GraphQlApiType => {
  const plurial = pluralize(singular);
  return {
    [GRAPHQL_ACTIONS.FindOne]: findOneBuilder(singular),
    [GRAPHQL_ACTIONS.CreateOne]: createOneBuilder(singular),
    [GRAPHQL_ACTIONS.UpdateOne]: updateOneBuilder(singular),
    [GRAPHQL_ACTIONS.DeleteOne]: deleteOneBuilder(singular),
    [GRAPHQL_ACTIONS.FindMany]: findManyBuilder(singular, plurial),
    [GRAPHQL_ACTIONS.CreateMany]: createManyBuilder(singular, plurial),
    [GRAPHQL_ACTIONS.UpdateMany]: updateManyBuilder(singular, plurial),
    [GRAPHQL_ACTIONS.DeleteMany]: deleteManyBuilder(singular, plurial),
    [GRAPHQL_ACTIONS.Count]: countBuilder(singular, plurial),
  };
};

export default createGraphQlApi;
