import { EntitySchema, EntitySchemaEnhanced } from '../index.d';
import { createGraphQlApi } from '@dots.cool/schemas';
import * as columnBuilder from '../../columns';
import { GRAPHQL_REQUESTS } from '@dots.cool/tokens';

const CREATE_ONE = GRAPHQL_REQUESTS.CreateOne;
const FIND_ONE = GRAPHQL_REQUESTS.FindOne;
const FIND_MANY = GRAPHQL_REQUESTS.FindMany;

function createViews(singular, fields) {
  if (!fields) return {};
  return Object.entries(fields).reduce(
    (acc, [fieldName, fieldConfig]) => {
      const {
        query,
        needsContext,
        sortable,
        defaultValue,
        validation,
        isIndexed,
        hideIn = [],
        ui,
      } = fieldConfig;

      // Create input Component
      const Input = ui.input({
        name: fieldName,
        label: `form.${singular}.${fieldName}.label`,
        placeholder: `form.${singular}.${fieldName}.placeholder`,
        description: `form.${singular}.${fieldName}.description`,
      });

      // Add field to query and columns
      [CREATE_ONE, FIND_ONE, FIND_MANY].forEach((request) => {
        if (!hideIn.includes(request)) {
          acc.views[request].fieldNames.add(fieldName);
          if (sortable !== false) {
            acc.sortableFields.add(fieldName);
          }
        }
        acc.views[request].query.add(query ?? fieldName);
      });

      // Create column definition except for indexed
      if (isIndexed && !acc.indexColumn) {
        acc.indexColumn = fieldName;
      } else {
        const column = ui.column({
          field: fieldName,
          headerName: `column.${singular}.${fieldName}.headerName`,
        });
        acc.columns[fieldName] = column;
      }

      if (needsContext === true) acc.needsContext.add(fieldName);

      acc.inputs[fieldName] = Input;
      acc.validations[fieldName] = validation;
      acc.defaultValues[fieldName] = defaultValue;

      return acc;
    },
    {
      indexColumn: '', // allow 'open' button and automatic generation of single page
      views: {
        [CREATE_ONE]: {
          fieldNames: new Set(),
          query: new Set(),
        },
        [FIND_ONE]: {
          fieldNames: new Set(),
          query: new Set(['id']),
        },
        [FIND_MANY]: {
          fieldNames: new Set(),
          query: new Set(['id']),
        },
      }, // allow page generations
      columns: {}, // to be extracted form queries
      inputs: {}, // to be extracted form fields
      validations: {}, // to be given to react hook form
      defaultValues: {}, // to be given to react hook form
      sortableFields: new Set(),
      needsContext: new Set(),
    }
  );
}

// TODO : Should get name from key and inject it in all functions (i.e: field & column)
const schema = (config: EntitySchema): EntitySchemaEnhanced => {
  const { singular, plurial, fields, customComponents } = config;

  const graphql = createGraphQlApi(singular, plurial);

  // Create arrays of components and informations
  const datas = createViews(singular, fields);
  if (!datas) return config;

  const {
    indexColumn,
    views,
    columns,
    inputs,
    validations,
    defaultValues,
    sortableFields,
    needsContext,
  } = datas;

  // Create indexedColumn with view
  if (columns) {
    columns[indexColumn] = columnBuilder.uniqueId({
      field: indexColumn,
      Component: 'test',
    })({});
  }

  // Flatten Queries
  if (views) {
    Object.values(views).forEach((view) => {
      view.fieldNames = [...view.fieldNames];
      view.query = [...view.query].join(' ');
    });
  }

  return {
    singular,
    plurial,
    graphql,
    indexColumn,
    sortableFields: [...sortableFields],
    needsContext: [...needsContext],
    views,
    columns,
    inputs,
    validations,
    defaultValues,
    customComponents,
  };
};

export default schema;
