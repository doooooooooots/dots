import { useMemo } from 'react';
import { APOLLO_STATE_PROP_NAME } from '../constants';
import initializeApollo from './initialize-apollo';

function useApollo(pageProps: pagePropsType) {
  const store = useMemo(
    () =>
      initializeApollo(() => {
        return pageProps[APOLLO_STATE_PROP_NAME] ?? {};
      }),
    [pageProps]
  );
  return store;
}

export default useApollo;
