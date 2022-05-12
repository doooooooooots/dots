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

import {
  FIND_ONE,
  FIND_MANY,
  COUNT,
  CREATE_ONE,
  CREATE_MANY,
  UPDATE_ONE,
  UPDATE_MANY,
  DELETE_ONE,
  DELETE_MANY,
} from '@dots.cool/tokens';

const createSchema = (singular: string, plurial: string) => {
  return {
    singular: singular,
    plurial: plurial,
    graphql: {
      // ONE
      [FIND_ONE]: findOneBuilder(singular),
      [CREATE_ONE]: createOneBuilder(singular),
      [UPDATE_ONE]: updateOneBuilder(singular),
      [DELETE_ONE]: deleteOneBuilder(singular),
      // MANY
      [FIND_MANY]: findManyBuilder(singular, plurial),
      [CREATE_MANY]: createManyBuilder(singular, plurial),
      [UPDATE_MANY]: updateManyBuilder(singular, plurial),
      [DELETE_MANY]: deleteManyBuilder(singular, plurial),
      // AGGREGATES
      [COUNT]: countBuilder(singular, plurial),
    },
  };
};

export default createSchema;
