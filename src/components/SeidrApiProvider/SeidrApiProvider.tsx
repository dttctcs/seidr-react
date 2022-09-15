import React, { ReactNode, createContext, useContext } from 'react';
import { useSeidrInfo } from '../SeidrProvider';
import { useProvideApi } from './useProvideApi';
import { urlJoin } from '../../utils';

import { QueryParams, Relation, DataGrid } from './types';

interface DataGridContextType {
  DataGrid: DataGrid;
}

const DataGridContext = createContext<DataGridContextType>({
  DataGrid: null,
});

export function useApi() {
  // get nearest context value
  const context = useContext(DataGridContext);
  if (context === undefined) {
    throw new Error('useApi must be used within a SeidrApiProvider');
  }

  return context.DataGrid;
}

export interface SeidrApiProviderProps {
  path?: string;
  relation?: Relation;
  initialQueryParams?: QueryParams;
  children: ReactNode;
}

export function SeidrApiProvider({ path = '', initialQueryParams, relation, children }: SeidrApiProviderProps) {
  const { baseUrl } = useSeidrInfo();

  const DataGrid = useProvideApi({ path: urlJoin(baseUrl, path), initialQueryParams, relation });

  return <DataGridContext.Provider value={{ DataGrid }}>{children}</DataGridContext.Provider>;
}
