import React, { ReactNode, createContext, useContext } from 'react';
import { SeidrAuth } from './types';
import { THEME } from './theme';

import { MantineProvider, MantineThemeOverride, useMantineTheme } from '@mantine/core';
import { useProvideAuth } from './useProvideAuth';
import { useProvideApi } from './useProvideApi';
import { useProvideInfo } from './useProvideInfo';

const SeidrContext = createContext({
  theme: {} as MantineThemeOverride, //Provide a default theme here
  auth: {} as SeidrAuth,
  api: {},
  info: {},
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

export interface SeidrporviderProps {
  baseURL?: string;
  theme?: MantineThemeOverride;
  inheritMantinetheme?: boolean;
  children: ReactNode;
}

export function SeidrProvider({ baseURL = '', theme, inheritMantineTheme = false, children }) {
  theme = inheritMantineTheme ? { ...useMantineTheme(), ...theme } : { ...THEME, ...theme };

  const auth = useProvideAuth(baseURL);
  const api = useProvideApi(baseURL);
  const info = { baseURL, ...useProvideInfo(baseURL, auth) };

  return (
    <SeidrContext.Provider value={{ theme, auth, api, info }}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </SeidrContext.Provider>
  );
}
