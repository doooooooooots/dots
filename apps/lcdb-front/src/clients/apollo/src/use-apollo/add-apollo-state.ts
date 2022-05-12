import { ApolloClient } from '@apollo/client';
import { APOLLO_STATE_PROP_NAME } from '../constants';

function addApolloState(
  client: ApolloClient<unknown>,
  pageProps: pagePropsType
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export default addApolloState;
