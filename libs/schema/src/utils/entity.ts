import { GraphQlApiType } from '../types/graphql-api';
import EntityConfig from '../types/entity';

import createGraphQlApi from './create-graphql-api';
import createFiltersApi from './create-filter-api';
import createSortApi from './create-sort-api';
import createColumnApi from './create-column-api';
import createFormApi from './create-form-api';
import createFragmentApi from './create-fragment-api';
import createValidationApi from './create-validation-api';
import createFieldApi from './create-field-api';

export type EntitySchema<T> = EntityConfig<T> & {
  graphql: GraphQlApiType;
};

/**
 */

export default function entity<T>(params: EntityConfig<T>): EntitySchema<T> {
  const { singular, fields, filters, form, fragments } = params;
  if (!singular) throw new Error('Entities must have a valid singular name');

  // * From fields
  // Generate filters
  const fieldApi = createFieldApi(fields);

  // Generate filters
  const filterApi = createFiltersApi(filters);

  // Generate column
  const columnApi = createColumnApi(fields);

  // Generate validation
  const validationApi = createValidationApi(filters);

  // Generate sort
  const sortApi = createSortApi(filters);

  // Generate form Api
  const formApi = createFormApi(form);

  // Generate form Api
  const fragmentApi = createFragmentApi(fragments);

  // Generate graphql Api
  const graphqlApi = createGraphQlApi(singular);

  return {
    singular,
    columns: columnApi,
    fields: fieldApi,
    filters: filterApi,
    forms: formApi,
    fragments: fragmentApi,
    graphql: graphqlApi,
    sorts: sortApi,
    validations: validationApi,
  };
}
