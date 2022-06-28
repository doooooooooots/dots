// FIND
import findOneBuilder from '../find-one-builder';
import findManyBuilder from '../find-many-builder';
// CREATE
import createOneBuilder from '../create-one-builder';
import createManyBuilder from '../create-many-builder';
// DELETE
import deleteOneBuilder from '../delete-one-builder';
import deleteManyBuilder from '../delete-many-builder';
// UPDATE
import updateOneBuilder from '../update-one-builder';
import updateManyBuilder from '../update-many-builder';
// AGGREGATES
import countBuilder from '../count-builder';
import pluralize = require('pluralize');

// Types
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { GraphQlApiType } from './create-schema.d';

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
