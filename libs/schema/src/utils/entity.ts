import { merge } from 'lodash';
import { GraphQlApiType } from '../create-graphql-api/create-graphql-api.d';
import EntityConfig from '../types/entity';
import createGraphQlApi from '../create-graphql-api/create-graphql-api';

export type EntitySchema<T> = EntityConfig<T> & {
  graphql: GraphQlApiType;
};

export default function entity<T>(params: EntityConfig<T>): EntitySchema<T> {
  const { singular } = params;
  if (!singular) throw new Error('Entities must have a valid singular name');

  const output = {
    graphql: createGraphQlApi(singular),
    filters: {
      default: {
        name: 'default',
        query: ['id'],
        filterAttributes: ['id'],
        getter: {
          primary: (option: { id: string }) => `${option.id}`,
        },
      },
    },
  };

  return merge(output, params);
}
