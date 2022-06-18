import React, { useMemo } from 'react';

import { Skeleton, TableRow } from '@mui/material';
import DataGridCell from './DataGridCell';

function DataGridSkeleton({ rows, columns, loading, animation, DataGridCellProps }) {
  const tableSkeleton = useMemo(() => {
    return rows.map((row, index) => (
      <TableRow key={index}>
        {columns.map((column, index) => (
          <DataGridCell key={index} {...DataGridCellProps}>
            <Skeleton animation={animation} />
          </DataGridCell>
        ))}
      </TableRow>
    ));
  }, [rows, columns, animation, DataGridCellProps]);

  return loading && tableSkeleton;
}

export default React.memo(DataGridSkeleton);
