import React, { createContext, useContext } from 'react';
import { THEME, DEFAULT_PROPS, DEFAULT_STYLES } from './theme';

import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useProvideAuth } from './useProvideAuth';
import { useProvideApi } from './useProvideApi';
import { useProvideInfo } from './useProvideInfo';

const SeidrContext = createContext({
  theme: {}, //Provide a default theme here
});

export function useSeidrAuth() {
  return useContext(SeidrContext).auth;
}

export function useSeidrApi() {
  return useContext(SeidrContext).api;
}

export function useSeidrInfo() {
  return useContext(SeidrContext).info;
}

export function useSeidrTheme() {
  return useMantineTheme() || {};
}

export function SeidrProvider({
  baseURL = window.location.origin,
  theme = THEME,
  inheritMantineTheme = false,
  children,
}) {
  const auth = useProvideAuth(baseURL);
  const api = useProvideApi(baseURL);
  const info = { baseURL, fetchSeidrInfo: useProvideInfo(baseURL) };

  return (
    <SeidrContext.Provider value={{ api, auth, info, theme }}>
      <MantineProvider theme={theme} inherit={inheritMantineTheme} defaultProps={DEFAULT_PROPS} styles={DEFAULT_STYLES}>
        {children}
      </MantineProvider>
    </SeidrContext.Provider>
  );
}
