import React, { createContext, useContext } from 'react';
import { THEME, DEFAULT_PROPS, DEFAULT_STYLES } from './theme';

import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useProvideAuth } from './useProvideAuth';
import { useProvideApi } from './useProvideApi';

const SeidrContext = createContext({
  theme: {}, //Provide a default theme here
  styles: {},
  classNames: {},
  defaultProps: {},
});

export function useSeidrAuth() {
  return useContext(SeidrContext).auth;
}

export function useSeidrApi() {
  return useContext(SeidrContext).api;
}

export function useSeidrBaseURL() {
  return useContext(SeidrContext).baseURL;
}

export function useSeidrTheme() {
  return useMantineTheme() || {};
}

export function useSeidrStyles(componentName) {
  const ctx = useContext(SeidrContext);
  return { styles: ctx.styles[componentName] || {}, classNames: ctx.classNames[componentName] || {} };
}

export function useSeidrDefaultProps(componentName, defaultProps, props) {
  const contextProps = useContext(SeidrContext)?.defaultProps?.[component] || {};
  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}

export function SeidrProvider({
  baseURL = window.location.origin,
  theme = THEME,
  styles = DEFAULT_STYLES,
  classNames = {},
  defaultProps = DEFAULT_PROPS,
  inheritMantineTheme = false,
  children,
}) {
  const auth = useProvideAuth(baseURL);
  const api = useProvideApi(baseURL);

  return (
    <SeidrContext.Provider value={{ api, auth, baseURL, classNames, styles, theme }}>
      <MantineProvider
        theme={theme}
        styles={styles}
        classNames={classNames}
        defaultProps={defaultProps}
        inherit={inheritMantineTheme}
      >
        {children}
      </MantineProvider>
    </SeidrContext.Provider>
  );
}
