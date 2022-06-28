import { EntitySchema, EntitySchemaEnhanced } from '..';
import { createGraphQlApi } from '@keystone-nx/schema--to-delete';
import { FIELD_TYPES, GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import { compose } from '@dots.cool/utils';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import pluralize from 'pluralize';
import { getIndexColumn } from '../index';
import * as columnBuilder from '../../columns';
import * as yup from 'yup';
import { get } from 'lodash';

const CREATE_ONE = GRAPHQL_REQUESTS.CreateOne;
const FIND_ONE = GRAPHQL_REQUESTS.FindOne;
const FIND_MANY = GRAPHQL_REQUESTS.FindMany;
const FIND_MANY_FROM_PARENT = GRAPHQL_REQUESTS.FindManyFromParent;

const VIEWS = [CREATE_ONE, FIND_ONE, FIND_MANY, FIND_MANY_FROM_PARENT];

interface fieldConfigType {
  ref: string;
  type: string;
  path: string;
  many: boolean;
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
  valueGetter?: (params: GridRenderCellParams) => string;
}

function flattenSets(views) {
  Object.values(views).forEach((view) => {
    view.fieldNames = [...view.fieldNames];
    view.query = [...view.query].join(' ');
  });
}

/**
 * ForeachView, add which field to request and which to hide
 */
function addToViews(
  views,
  fieldName: string,
  { ref, hideIn = [], type, many, path }
) {
  VIEWS.forEach((request) => {
    if (hideIn.includes(request)) return;

    //? Add field to view
    views[request].fieldNames.add(fieldName);

    //? Transform path
    //-> If path present in config, override
    if (path) {
      const pathArray = path.split('.').reverse();
      const _query = pathArray.reduce(
        (acc, item) => `${item} ${acc ? `{${acc}}` : acc}`
      );
      views[request].query.add(_query);
      return;
    }

    //? DEFAULTS
    //-> For non relational fields
    if (type !== FIELD_TYPES.relationship) {
      views[request].query.add(fieldName);
      return;
    }

    //? RELATIONSHIP
    //-> For relational fields
    if (!many) {
      const indexCol = getIndexColumn(ref);
      views[request].query.add(`${ref} {id ${indexCol}}`);
    } else {
      views[request].query.add(`${pluralize(ref)}Count`);
    }
  });

  // [ ](Adrien): Manage link between CREATE <-> FIND FOR CACHE PURPOSE
  //-> CREATE > FIND MANY, so we need to ask all field ?

  return views;
}

/**
 * Add fieldName and headerName depending on object field name
 */
function createColumn(singular, fieldName, { type, many, ui, path }) {
  //-> DEFAULT
  // [ ](Adrien): Can be created directly when display table
  const columnArgs: columnArgsType = {
    field: fieldName,
    headerName: `column.${singular}.${fieldName}.headerName`,
  };

  //-> RELATIONSHIP
  if (type === FIELD_TYPES.relationship && many === true) {
    columnArgs.count = ({ row }) => row[`${fieldName}Count`];
  }

  //-> PATH: Create column valueGetter
  let valueGetter = ({ row }) => get(row, fieldName);
  if (path) valueGetter = ({ row }) => get(row, path);

  columnArgs.valueGetter = valueGetter;

  //-> Return object
  return ui.column(columnArgs);
}

function createSchema(singular: string, fields) {
  if (!fields) return {};

  const initViews = VIEWS.reduce(
    (acc, VIEW) => ({
      ...acc,
      [VIEW]: {
        fieldNames: new Set(),
        query: new Set(['id']),
      },
    }),
    {}
  );

  return Object.entries(fields).reduce(
    (acc, [fieldName, fieldConfig]) => {
      if (!fieldName) return acc;

      const {
        type,
        ref,
        path,
        sortable,
        defaultValue,
        validation,
        isIndexed,
        ui,
        formatData,
      } = fieldConfig as fieldConfigType;

      if (!ui) {
        throw Error('schema.error.ui.required');
      }

      //* VIEWS
      addToViews(acc.views, fieldName, fieldConfig);

      //* COLUMNS
      //? Create column definition except for indexed
      if (isIndexed && acc.indexColumn === 'id') {
        acc.indexColumn = fieldName;
      } else {
        acc.columns[fieldName] = createColumn(singular, fieldName, fieldConfig);
      }

      //* SORTABLES COLUMNS
      // FIXME:[ ](Adrien): Does not garanty that column is shown in actual view
      //? Add field to sortable
      if (sortable !== false && !path) {
        acc.sortableFields.add(fieldName);
      }

      //* RELATIONSHIP SPECIAL NEEDS
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
      indexColumn: 'id', // allow 'open' button and automatic generation of single page
      views: initViews, // allow page generations
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

const schema = (config: EntitySchema): EntitySchemaEnhanced => {
  if (!config) throw Error('error.schema.config.missing');

  const { singular, plurial, fields, customComponents } = config;

  //-> Create graphQL API
  const graphql = createGraphQlApi(singular, plurial);

  //-> Create arrays of components and informations
  const {
    indexColumn,
    views,
    columns,
    inputs,
    validations,
    defaultValues,
    sortableFields,
    needsContext,
    formatFunctions,
  } = createSchema(singular, fields);

  // Create indexedColumn with view
  if (columns && indexColumn) {
    columns[indexColumn] = columnBuilder.uniqueId({
      field: indexColumn,
      Component: 'test',
    })({});
  }

  // Flatten Queries
  if (views) {
    flattenSets(views);
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
