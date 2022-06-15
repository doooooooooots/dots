import { merge } from 'lodash';

export default function entity(params) {
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
  };
  return merge(output, params);
}
