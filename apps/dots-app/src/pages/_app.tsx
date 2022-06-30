import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

// Style
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../lib/create-emotion-cache';
import createTheme from '@dots.cool/theme';

// Date
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

// Apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';

// Auth
import { AuthConsumer, AuthProvider } from '../contexts/keystone-context';

// Toaster
import { Toaster } from 'react-hot-toast';

// Schemas
import {
  createSchema,
  DotsSchemaProvider,
  // Person,
  BuyAction,
  Project,
  // Roof,
  // Layout,
  // Cladding,
  // SolarModule,
  // Product,
} from '@dots.cool/schema';

// Components
import { SplashScreen } from '@dots.cool/components';
import { NextComponentType } from 'next';
import { HistoryProvider } from '@dots.cool/dots-system';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  direction: 'ltr',
  responsiveFontSizes: true,
  mode: 'light',
});

const schema = createSchema({
  // Person,
  Project,
  BuyAction,
  // Roof,
  // Layout,
  // Cladding,
  // SolarModule,
  // Product,
});

export type AppSchema = typeof schema;

type PageComponent = NextComponentType & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
};

interface DotsAppProps extends AppProps {
  emotionCache: EmotionCache;
  Component: PageComponent;
}

export default function MyApp(props: DotsAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={frLocale}
      >
        <DotsSchemaProvider schema={schema}>
          <HistoryProvider>
            <ApolloProvider client={apolloClient}>
              <AuthProvider>
                {/* Meta */}
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>

                {/* Theme */}
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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

                  <AuthConsumer>
                    {(auth) =>
                      !auth.isInitialized ? (
                        <SplashScreen />
                      ) : (
                        getLayout(<Component {...pageProps} />)
                      )
                    }
                  </AuthConsumer>
                </ThemeProvider>
              </AuthProvider>
            </ApolloProvider>
          </HistoryProvider>
        </DotsSchemaProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
