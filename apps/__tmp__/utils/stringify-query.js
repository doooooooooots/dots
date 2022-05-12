import { singular } from 'pluralize';
import capitalizeFirstLetter from './capitalize-first-letter';

export const stringifyQuery = (query) => {
  const {
    type = 'query',
    inputName = '',
    inputParams = '',
    outputName = '',
    outputParams = '',
    outputFields = []
  } = query;

  return `${type} ${inputName}${inputParams} { ${outputName}${outputParams} { ${outputFields?.join(' ')} }}`;
};

export const mutationQuery = (type, mutation, outputFields = null) => {
  return stringifyQuery({
    type: 'mutation',
    inputName: `${type}${capitalizeFirstLetter(mutation)}`,
    inputParams: `($input: ${capitalizeFirstLetter(type)}${capitalizeFirstLetter(mutation)}Input!)`,
    outputParams: '(input: $input)',
    outputName: `${type}${capitalizeFirstLetter(mutation)}`,
    outputFields: outputFields || ['id']
  });
};

export const mutationMultipleQuery = (type, mutation, outputFields = null) => {
  return stringifyQuery({
    type: 'mutation',
    inputName: `${type}${capitalizeFirstLetter(mutation)}`,
    inputParams: `($input: ${capitalizeFirstLetter(type)}${capitalizeFirstLetter(mutation)}Input!)`,
    outputParams: '(input: $input)',
    outputName: `${type}${capitalizeFirstLetter(mutation)}`,
    outputFields: [`data { ${(outputFields || ['id'])?.join(' ')} }`, 'message', 'status']
  });
};

export const queryQuery = (entity, outputFields = null) => {
  return stringifyQuery({
    type: 'query',
    inputName: entity,
    inputParams: '($id: ID!)',
    outputName: entity,
    outputParams: '(id: $id)',
    outputFields: outputFields || ['id']
  });
};

export const queryMultipleQuery = (entities, outputFields = null) => {
  return stringifyQuery({
    type: 'query',
    inputName: entities,
    inputParams: `($orderBy: OrderBy, $pagination: Pagination, $filter: ${capitalizeFirstLetter(
      singular(entities)
    )}Filter )`,
    outputName: entities,
    outputParams: '(orderBy: $orderBy, pagination: $pagination, filter: $filter)',
    outputFields: outputFields || ['id']
  });
};
