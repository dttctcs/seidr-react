import React, { ReactNode, createContext, useContext } from 'react';
import { THEME, MUI_THEME } from './theme';

import { ThemeProvider } from '@mui/material/styles';
import { MantineProvider, MantineThemeOverride, useMantineTheme } from '@mantine/core';
import { useProvideAuth } from './useProvideAuth';
import { useProvideInfo } from './useProvideInfo';

const SeidrContext = createContext({
  theme : {}, //Provide a default theme here
  auth: {},
  info: {},
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

export function SeidrProvider(seidrPrivderProps) {
  const defaultSeidrPrivderProps = { baseUrl : '', inheritMantineTheme : false }
  const { baseUrl, theme, inheritMantineTheme ,children } = {...defaultSeidrPrivderProps, ...seidrPrivderProps}
  const activeTheme = inheritMantineTheme ? { ...useMantineTheme(), ...theme } : { ...THEME, ...theme };

  const auth = useProvideAuth(baseUrl);
  const info = { baseUrl, ...useProvideInfo(baseUrl, auth) };

  return (
      <SeidrContext.Provider value={{ activeTheme, auth, info }}>
        <MantineProvider theme={activeTheme} withCSSVariables withNormalizeCSS withGlobalStyles>
          <ThemeProvider theme={MUI_THEME}>
            {children}
          </ThemeProvider>
        </MantineProvider>
      </SeidrContext.Provider>
  );
}
