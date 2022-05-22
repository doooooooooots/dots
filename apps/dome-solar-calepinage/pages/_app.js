import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '../src/theme';
import createEmotionCache from '../src/lib/createEmotionCache';
import { StoreProvider } from '../src/components/context/useStore';
// Apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/lib/apolloClient';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <StoreProvider>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider
            theme={createTheme({
              direction: 'ltr',
              responsiveFontSizes: true,
              mode: 'light',
            })}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </StoreProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
