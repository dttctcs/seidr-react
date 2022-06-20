import React, { createContext, useContext } from 'react';
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
  return useContext(SeidrContext)?.theme || {};
}

export function useSeidrStyles(componentName) {
  const ctx = useContext(SeidrContext);
  return { styles: ctx.styles[componentName] || {}, classNames: ctx.classNames[componentName] || {} };
}

export function SeidrProvider({
  baseURL = window.location.origin,
  theme = {},
  styles = {},
  classNames = {},
  defaultProps = {},

  children,
}) {
  const auth = useProvideAuth();
  const api = useProvideApi();
  return (
    <SeidrContext.Provider value={{ api, auth, baseURL, classNames, styles, theme }}>{children}</SeidrContext.Provider>
  );
}
