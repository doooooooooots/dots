import { merge } from 'lodash';
import { createGraphQlApi } from '@dots.cool/schemas';

export default function entity(params) {
  const { singular } = params;
  if (!singular) throw new Error('Entities must have a valid singular name');

  const output = {
    default: {
      name: 'default',
      query: ['id'],
      filterAttributes: ['id'],
      components: {
        Icon: null,
        Option: null,
        Preview: null,
      },
      getters: {
        icon: () => <></>,
        avatar: () => <></>,
        primary: () => '',
        secondary: () => '',
        info: () => '',
      },
    },
    graphql: createGraphQlApi(singular),
  };
  return merge(output, params);
}
