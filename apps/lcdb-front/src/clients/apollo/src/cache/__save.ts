import { InMemoryCache, makeVar } from '@apollo/client';

export const whereVar = makeVar({});
export const currentTabVar = makeVar('status');

export const filterListVar = makeVar([]);
export const sortVar = makeVar([
  {
    id: '1',
    key: 10,
    value: 'asc'
  },
  {
    id: '2',
    key: 20,
    value: 'desc'
  },
  {
    id: '3',
    key: 30,
    value: 'desc'
  }
]);

export const filterVar = makeVar({
  operator: 'and',
  filters: [],
  byId: {}
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        where: {
          read() {
            return whereVar();
          }
        },
        sort: {
          read() {
            return sortVar();
          }
        }
      }
    }
  }
});

export default cache;

export const loader = {
  type: 'reducer',
  reducers: {
    collection_group_results: {
      type: 'results',
      limit: 50
    }
  },
  filter: {
    operator: 'and',
    filters: [
      {
        property: 'title',
        filter: {
          operator: 'string_contains',
          value: {
            type: 'exact'
          }
        }
      },
      {
        property: 'title',
        filter: {
          operator: 'string_contains',
          value: {
            type: 'exact'
          }
        }
      },
      {
        operator: 'or',
        filters: [
          {
            property: 'title',
            filter: {
              operator: 'string_does_not_contain',
              value: {
                type: 'exact',
                value: 'klk'
              }
            }
          },
          {
            property: 'title',
            filter: {
              operator: 'string_contains',
              value: {
                type: 'exact'
              }
            }
          }
        ]
      }
    ]
  },
  sort: [
    {
      property: 'title',
      direction: 'ascending'
    },
    {
      property: 'maGp',
      direction: 'ascending'
    }
  ],
  searchQuery: '',
  userTimeZone: 'Europe/Paris'
};
