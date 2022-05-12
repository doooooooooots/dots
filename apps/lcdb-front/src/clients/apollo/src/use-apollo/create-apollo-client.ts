import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cache from '../cache';

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

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

export default createApolloClient;
