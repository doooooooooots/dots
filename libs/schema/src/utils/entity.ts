import EntityConfig, { EntitySchema } from '../types/entity';

import createGraphQlApi from './create-graphql-api';
import createFormApi from './create-form-api';
import createColumnApi from './create-column-api';
import createFragmentApi from './create-fragment-api';
import createFieldApi from './create-field-api';

export default function entity<T extends string>(
  params: EntityConfig<T>
): EntitySchema<T> {
  const {
    singular,
    fields,
    allowedSort,
    allowedFilter,
    searchFilters,
    form,
    fragments,
  } = params;

  if (!singular) throw new Error('Entities must have a valid singular name');

  // Generate filters
  // *From fields
  // !DONT ACT FOR NOW
  const fieldApi = createFieldApi(fields);

  /**
   * Parse data for extended fragments and initialize empty fragments to all the fields
   */
  //!
  const _fragments = createFragmentApi(fragments, fields);

  // Generate column
  const columnApi = createColumnApi<T>(_fragments, fields);

  // Generate validation and default values
  const formApi = createFormApi(form, fields);

  // Generate graphql Api
  const graphqlApi = createGraphQlApi(singular);

  return {
    singular,
    allowedSort,
    allowedFilter,
    searchFilters,
    columnApi: columnApi,
    fields: fieldApi,
    fragments: _fragments,
    graphql: graphqlApi,
    formApi: formApi,
  };
}
