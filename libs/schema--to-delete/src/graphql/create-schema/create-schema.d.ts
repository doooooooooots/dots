import type { GRAPHQL_ACTIONS } from '@dots.cool/tokens';

export type GraphQlApiType = {
  [key in GRAPHQL_ACTIONS[keyof typeof GRAPHQL_ACTIONS]]: (
    query: string,
    lang?: boolean
  ) => DocumentNode;
};
