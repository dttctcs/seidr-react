import { createContext, useContext } from 'react';

import { MantineProvider, useMantineTheme } from '@mantine/core';
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
  const activeTheme = inheritMantineTheme ? { ...useMantineTheme(), ...theme } : { ...theme };

  const auth = useProvideAuth(baseUrl);
  const info = { baseUrl, ...useProvideInfo(baseUrl, auth) };

  return (
      <SeidrContext.Provider value={{ activeTheme, auth, info }}>
        <MantineProvider theme={activeTheme} withCSSVariables withNormalizeCSS withGlobalStyles>
          {children}
        </MantineProvider>
      </SeidrContext.Provider>
  );
}
