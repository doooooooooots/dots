import { EntitySchema, EntitySchemaEnhanced } from '../index.d';
import { createGraphQlApi } from '@dots.cool/schemas';
import * as columnBuilder from '../../columns';

function createViews(singular, fields) {
  if (!fields) return {};
  return Object.entries(fields).reduce(
    (acc, [fieldName, fieldConfig]) => {
      const {
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

      // Create column definition except for indexed
      let column;
      if (isIndexed && !acc.indexColumn) {
        acc.indexColumn = fieldName;
        return acc;
      } else {
        column = ui.column({
          field: fieldName,
          headerName: `column.${singular}.${fieldName}.headerName`,
        });
      }

      ['createOne', 'findOne', 'findMany'].forEach((request) => {
        if (!hideIn.includes(request))
          acc.views[request].fieldNames.add(fieldName);
        acc.views[request].query.add(fieldName);
      });

      if (column) acc.columns[fieldName] = column;
      acc.inputs[fieldName] = Input;
      acc.validations[fieldName] = validation;
      acc.defaultValues[fieldName] = defaultValue;

      return acc;
    },
    {
      indexColumn: '', // allow 'open' button and automatic generation of single page
      views: {
        createOne: {
          fieldNames: new Set(),
          query: new Set(),
        },
        findOne: {
          fieldNames: new Set(),
          query: new Set(),
        },
        findMany: {
          fieldNames: new Set(),
          query: new Set(),
        },
      }, // allow page generations
      columns: {}, // to be extracted form queries
      inputs: {}, // to be extracted form fields
      validations: {}, // to be given to react hook form
      defaultValues: {}, // to be given to react hook form
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

  const { indexColumn, views, columns, inputs, validations, defaultValues } =
    datas;

  // Create indexedColumn with view
  if (columns) {
    columns[indexColumn] = columnBuilder.uniqueId({
      name:
      Component: 'test',
    })(indexColumn);
  }

  return {
    singular,
    plurial,
    graphql,
    indexColumn,
    views,
    columns,
    inputs,
    validations,
    defaultValues,
    customComponents,
  };
};

export default schema;
