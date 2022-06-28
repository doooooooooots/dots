/* eslint-disable no-undef */
import { ApolloProvider } from '@apollo/client';

import {
  DotsSystemProvider,
  SettingsConsumer,
  Toaster,
  CommandBar,
  HistoryBrowser,
} from '@dots.cool/dots-system';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import * as React from 'react';
import { useApollo } from '../src/clients/apollo';
import createTheme from '../src/theme';
import createEmotionCache from '../src/utils/create-emotion-cache';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const actions = [];

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  // const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Le Coin des Barons</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <DotsSystemProvider actions={actions}>
          <SettingsConsumer>
            {({ settings }) => {
              const theme = createTheme({
                direction: settings.direction,
                responsiveFontSizes: settings.responsiveFontSizes,
                mode: settings.theme,
              });
              return (
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                      style: {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                      },
                    }}
                  />
                  <CommandBar />
                  <HistoryBrowser maxWidth="lg" fullWidth />
                  {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
              );
            }}
          </SettingsConsumer>
        </DotsSystemProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
