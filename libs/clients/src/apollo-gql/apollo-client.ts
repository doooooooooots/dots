import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { isEqual, merge } from 'lodash';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<unknown>;

function createApolloClient(uri: string, cache?: unknown) {
  const httpLink = createHttpLink({ uri });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('accessToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : ''
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache,
  });
}

function initializeApollo(uri: string, cache: unknown, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(uri, cache);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

type pagePropsType = {
  props?: Record<string, unknown>;
};

function addApolloState(
  client: ApolloClient<unknown>,
  pageProps: pagePropsType
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME] ?? {};
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

export { initializeApollo, addApolloState, useApollo };
export default useApollo;
