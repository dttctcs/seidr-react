import React, { ReactNode, createContext, useContext } from 'react';
import { SeidrAuth, SeidrInfo } from './types';
import { THEME, MUI_THEME } from './theme';

import { ThemeProvider } from '@mui/material/styles';
import { MantineProvider, MantineThemeOverride, useMantineTheme } from '@mantine/core';
import { useProvideAuth } from './useProvideAuth';
import { useProvideInfo } from './useProvideInfo';

const SeidrContext = createContext({
  theme: {} as MantineThemeOverride, //Provide a default theme here
  auth: {} as SeidrAuth,
  info: {} as SeidrInfo,
});

export function useSeidrAuth() {
  return useContext(SeidrContext).auth;
}

export function useSeidrInfo() {
  return useContext(SeidrContext).info;
}

export function useSeidrTheme() {
  return useMantineTheme() || {};
}

export interface SeidrProviderProps {
  baseUrl?: string;
  theme?: MantineThemeOverride;
  inheritMantineTheme?: boolean;
  children: ReactNode;
}

export function SeidrProvider({ baseUrl = '', theme, inheritMantineTheme = false, children }: SeidrProviderProps) {
  theme = inheritMantineTheme ? { ...useMantineTheme(), ...theme } : { ...THEME, ...theme };

  const auth = useProvideAuth(baseUrl);
  const info = { baseUrl, ...useProvideInfo(baseUrl, auth) };

  return (
    <SeidrContext.Provider value={{ theme, auth, info }}>
      <MantineProvider theme={theme} withCSSVariables withNormalizeCSS>
        <ThemeProvider theme={MUI_THEME}>{children}</ThemeProvider>
      </MantineProvider>
    </SeidrContext.Provider>
  );
}
