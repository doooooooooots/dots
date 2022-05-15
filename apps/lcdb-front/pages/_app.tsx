/* eslint-disable no-undef */
import { ApolloProvider } from '@apollo/client';
import {
  DialogProvider,
  SettingsConsumer,
  SettingsProvider,
} from '@dots.cool/hooks';
import { HistoryProvider } from '@dots.cool/dots-system';

import { CacheProvider } from '@emotion/react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar';
import { MemoryProvider } from '@dots.cool/form-builder';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { useApollo } from '../src/clients/apollo';
import createTheme from '../src/theme';
import createEmotionCache from '../src/utils/create-emotion-cache';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const searchStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  // boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  background: 'white',
  color: 'black',
};

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  background: 'white',
  color: 'black',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0px 6px 20px rgb(0 0 0 / 20%)',
};

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  opacity: 0.5,
};

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
        <SettingsProvider>
          <MemoryProvider>
            <HistoryProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider
                    theme={createTheme({
                      direction: settings.direction,
                      responsiveFontSizes: settings.responsiveFontSizes,
                      mode: settings.theme,
                    })}
                  >
                    <KBarProvider actions={actions}>
                      <DialogProvider>
                        <CssBaseline />
                        <Toaster position="bottom-right" reverseOrder={false} />
                        <CommandBar />
                        {getLayout(<Component {...pageProps} />)}
                      </DialogProvider>
                    </KBarProvider>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </HistoryProvider>
          </MemoryProvider>
        </SettingsProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <Box sx={groupNameStyle}>{item}</Box>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}

// eslint-disable-next-line react/display-name
const ResultItem: any = React.forwardRef((props, ref) => {
  const { action, active, currentRootActionId } = props as any;
  const ancestors = React.useMemo(() => {
    if (!currentRootActionId) return action.ancestors;
    const index = action.ancestors.findIndex(
      (ancestor) => ancestor.id === currentRootActionId
    );
    return action.ancestors.slice(index + 1);
  }, [action.ancestors, currentRootActionId]);

  return (
    <Box
      ref={ref}
      sx={{
        padding: '12px 16px',
        background: active ? '#fafafa' : 'transparent',
        borderLeft: `2px solid ${active ? 'black' : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        {action.icon && action.icon}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span
                    style={{
                      opacity: 0.5,
                      marginRight: 8,
                    }}
                  >
                    {ancestor.name}@
                  </span>
                  <span
                    style={{
                      marginRight: 8,
                    }}
                  >
                    &rsaquo;
                  </span>
                </React.Fragment>
              ))}
            <span>{action.name}</span>
          </div>
          {action.subtitle && (
            <span style={{ fontSize: 12 }}>{action.subtitle}</span>
          )}
        </div>
      </div>
      {action.shortcut?.length ? (
        <div
          aria-hidden
          style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}
        >
          {action.shortcut.map((sc) => (
            <kbd
              key={sc}
              style={{
                padding: '4px 6px',
                background: 'rgba(0 0 0 / .1)',
                borderRadius: '4px',
                fontSize: 14,
              }}
            >
              {sc}
            </kbd>
          ))}
        </div>
      ) : null}
    </Box>
  );
});
