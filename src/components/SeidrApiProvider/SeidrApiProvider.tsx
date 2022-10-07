import React, { ReactNode, createContext, useContext } from 'react';
import { useSeidrInfo } from '../SeidrProvider';
import { useProvideApi } from './useProvideApi';
import { urlJoin } from '../../utils';

import { QueryParams, Relation, Api } from './types';

interface SeidrApiProviderContextType {
  Api?: Api;
}

const SeidrApiContext = createContext<SeidrApiProviderContextType>({});

export function useApi() {
  // get nearest context value
  const context = useContext(SeidrApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within a SeidrApiProvider');
  }

  return context.Api;
}

export interface SeidrApiProviderProps {
  path?: string;
  relation?: Relation;
  initialQueryParams?: QueryParams;
  children: ReactNode;
}

export function SeidrApiProvider({ path = '', initialQueryParams, relation, children }: SeidrApiProviderProps) {
  const { baseUrl } = useSeidrInfo();

  const Api = useProvideApi({ path: urlJoin(baseUrl, path), initialQueryParams, relation });

  return <SeidrApiContext.Provider value={{ Api }}>{children}</SeidrApiContext.Provider>;
}
