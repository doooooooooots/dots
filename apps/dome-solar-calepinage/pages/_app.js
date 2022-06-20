import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '../src/theme';
import createEmotionCache from '../src/lib/create-emotion-cache';
import { StoreProvider } from '../src/contexts/useStore';
import frLocale from 'date-fns/locale/fr';

// Apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/lib/apollo-client';
import { AuthConsumer, AuthProvider } from '../src/contexts/keystone-context';
import { SplashScreen } from '../src/components/design-system/screens/splash-screen';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast';
import { DotsProvider } from '../src/components/dots-system/context/dots-context';
import createSchema from '../src/components/dots-system/utils/schema';
import Person from '../src/components/dots-system/entities/person';
import Project from '../src/components/dots-system/entities/project';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  direction: 'ltr',
  responsiveFontSizes: true,
  mode: 'light',
});

const schema = createSchema({
  Person,
  Project,
});

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={frLocale}
      >
        <DotsProvider schema={schema}>
          <ApolloProvider client={apolloClient}>
            <AuthProvider>
              <StoreProvider>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>
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
              </StoreProvider>
            </AuthProvider>
          </ApolloProvider>
        </DotsProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
