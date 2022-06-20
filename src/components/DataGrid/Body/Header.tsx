import React from 'react';

import { TableHead, TableRow } from '@mui/material';
import DataGridCell from '../DataGridCell';
import { HeaderCell } from './HeaderCell';

export const Header = React.memo(({ state, onSortBy, hideActions }) => {
  return (
    <TableHead>
      <TableRow>
        {!hideActions ? (
          <DataGridCell sx={{ width: 112, pl: 1.625 }} rtl={state.settings.rtl}>
            Actions
          </DataGridCell>
        ) : null}
        {state.data.list_columns.map((column, index) => (
          <DataGridCell key={column} sx={{ whiteSpace: 'nowrap' }}>
            <HeaderCell column={column} onSortBy={onSortBy} state={state} />
          </DataGridCell>
        ))}
      </TableRow>
    </TableHead>
  );
});
