import { FormApiType, FormDefinition } from '../utils/create-form-api';
import { FragmentType } from '../utils/create-fragment-api';
import { Field, FieldDefinitions } from './field';
import { GraphQlApiType } from './graphql-api';
import { SearchFilterAttributesType } from './search-filter';

export interface EntityConfig<T extends string> {
  singular: string;
  copyright?: {
    form: string;
  };
  pictures?: {
    form: string;
  };
  allowedSort: T[];
  allowedFilter: T[];
  fields: FieldDefinitions<T>;
  form: FormDefinition<T>;
  searchFilters?: Record<'default' | string, SearchFilterAttributesType<T>>;
  fragments: {
    details: string;
    preview?: string;
    single?: string;
  };
}

export type EntitySchema<T extends string> = Omit<EntityConfig<T>, 'form'> & {
  graphql: GraphQlApiType;
  columnApi: {
    getColumnsFromFragment: (fragment: string) => Field[];
  };
  formApi: FormApiType<T>;
};

export default EntityConfig;
