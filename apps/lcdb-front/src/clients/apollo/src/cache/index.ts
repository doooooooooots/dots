import { InMemoryCache } from '@apollo/client';
import sortVar from './sort';
import whereVar from './where';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        where: {
          read() {
            return whereVar();
          },
        },
        sort: {
          read() {
            return sortVar();
          },
        },
      },
    },
  },
});

export default cache;
