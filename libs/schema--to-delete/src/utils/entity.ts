import { merge } from 'lodash';
import { GraphQlApiType } from '../graphql/create-schema';
import createGraphQlApi from '../graphql/create-schema/create-schema';
import EntityConfig from '../types/entity';

type EntitySchema<T> = EntityConfig<T> & {
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
