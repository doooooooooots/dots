import { EntitySchema, EntitySchemaEnhanced } from '../index.d';
import { createGraphQlApi } from '@dots.cool/schemas';
import * as columnBuilder from '../../columns';
import { FIELD_TYPES, GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import { compose } from '@dots.cool/utils';
import * as yup from 'yup';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';

const CREATE_ONE = GRAPHQL_REQUESTS.CreateOne;
const FIND_ONE = GRAPHQL_REQUESTS.FindOne;
const FIND_MANY = GRAPHQL_REQUESTS.FindMany;

interface fieldConfigType {
  query: string | ((fieldName: string) => string);
  needsContext: boolean;
  sortable: boolean;
  defaultValue: object;
  validation: unknown;
  isIndexed: boolean;
  hideIn: string[];
  ui: {
    input: InputItemType;
    column: ColumnItemType;
  };
  formatData: (fieldName: string) => (data: unknown) => unknown;
}

interface columnArgsType {
  field: string;
  headerName: string;
  count?: (params: GridRenderCellParams) => number;
  filterQuery?: (params: GridRenderCellParams) => any;
}

function createViews(singular, fields) {
  if (!fields) return {};

  return Object.entries(fields).reduce(
    (acc, [fieldName, fieldConfig]) => {
      const {
        query,
        type,
        ref,
        many,
        sortable,
        defaultValue,
        validation,
        isIndexed,
        hideIn = [],
        ui,
        formatData,
      } = fieldConfig as fieldConfigType;

      //* INPUT
      //? Create input Component
      const inputArgs = {
        name: fieldName,
        label: `form.${singular}.${fieldName}.label`,
        placeholder: `form.${singular}.${fieldName}.placeholder`,
        description: `form.${singular}.${fieldName}.description`,
      };
      const Input = ui.input(inputArgs);
      acc.inputs[fieldName] = Input;

      //* QUERIES
      // [ ](Adrien): Manage link between CREATE <-> FIND FOR CACHE PURPOSE
      [CREATE_ONE, FIND_ONE, FIND_MANY].forEach((request) => {
        if (!hideIn.includes(request)) {
          //? Add field to view
          acc.views[request].fieldNames.add(fieldName);

          //? Add field to sortable
          if (sortable !== false) {
            acc.sortableFields.add(fieldName);
          }

          //? Add field to query
          if (query) {
            if (typeof query === 'function') {
              acc.views[request].query.add(query(fieldName));
            } else {
              acc.views[request].query.add(query);
            }
          } else {
            if (type === FIELD_TYPES.relationship) {
              // [ ](Adrien): Clean logic for query
              if (!many) {
                acc.views[request].query.add(`${fieldName} {id name}`);
              } else {
                acc.views[request].query.add(`${fieldName}Count`);
              }
            } else {
              acc.views[request].query.add(fieldName);
            }
          }
        }
      });

      //* COLUMNS
      //? Create column definition except for indexed
      if (isIndexed && !acc.indexColumn) {
        //-> CASE indexed column
        acc.indexColumn = fieldName;
      } else {
        //-> DEFAULT
        const columnArgs: columnArgsType = {
          field: fieldName,
          headerName: `column.${singular}.${fieldName}.headerName`,
        };

        //-> RELATIONSHIP
        if (type === FIELD_TYPES.relationship && many === true) {
          columnArgs.count = ({ row }) => row[`${fieldName}Count`];
        }

        const column = ui.column(columnArgs);
        acc.columns[fieldName] = column;
      }

      //* RELATIONSHIP
      if (type === FIELD_TYPES.relationship) {
        acc.needsContext[fieldName] = { ref: ref || fieldName };
        if (typeof formatData === 'function')
          acc.formatFunctions.push(formatData(fieldName));
      }

      //* VALIDATIONS
      if (validation) {
        acc.validations[fieldName] = validation;
      }

      //* DEFAULT VALUES
      if (defaultValue !== undefined) {
        acc.defaultValues[fieldName] = defaultValue;
      }

      return acc;
    },
    {
      indexColumn: '', // allow 'open' button and automatic generation of single page
      views: {
        [CREATE_ONE]: {
          fieldNames: new Set(),
          query: new Set(['id']),
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
      needsContext: {},
      formatFunctions: [(data: unknown) => data],
    }
  );
}

// [ ] : Should get name from key and inject it in all functions (i.e: field & column)
const schema = (config: EntitySchema): EntitySchemaEnhanced => {
  if (!config) return {};

  const { singular, plurial, fields, customComponents } = config;

  //-> Create graphQL API
  const graphql = createGraphQlApi(singular, plurial);

  //-> Create arrays of components and informations
  const datas = createViews(singular, fields);
  if (!datas) return config;

  const {
    indexColumn = 'id',
    views,
    columns,
    inputs,
    validations,
    defaultValues,
    sortableFields,
    needsContext,
    formatFunctions,
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
    needsContext,
    views,
    columns,
    inputs,
    validations: yup.object(validations),
    defaultValues,
    formatData: compose(...formatFunctions),
    customComponents,
  };
};

export default schema;
