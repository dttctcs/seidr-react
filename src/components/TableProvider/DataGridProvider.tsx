import React, { ReactNode, createContext, useContext } from 'react';
import { useSeidrInfo } from '../SeidrProvider';
import { useProvideTable } from './useProvideTable';
import { urlJoin } from '../../utils';

import { Relation, Table } from './types';

interface TableContextType {
  table: Table;
}

const TableContext = createContext<TableContextType>({
  table: null,
});

export function useTable() {
  // get nearest context value
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used within a TableProvider');
  }

  return context.table;
}

export interface TableProviderProps {
  path?: string;
  relation?: Relation;
  children: ReactNode;
}

export function TableProvider({ path = '', relation, children }: TableProviderProps) {
  const { baseUrl } = useSeidrInfo();

  const table = useProvideTable({ path: urlJoin(baseUrl, path), relation });

  return <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>;
}
