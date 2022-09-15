import React, { ReactNode } from 'react';
import applyStyles from './Row.styles';

interface RowProps {
  entry: any;
  selected: boolean;
  striped: boolean;

  onSelect: any;
  setSelectedItem: any;

  children: ReactNode;
}

export function Row({ entry, selected, striped, onSelect, setSelectedItem, children }: RowProps) {
  const { classes } = applyStyles({ selected, selecDataGrid: !!onSelect, striped }, { name: 'DataGrid' });

  return (
    <tr
      className={classes.row}
      onClick={(event) => {
        if (onSelect) {
          setSelectedItem(entry);
          onSelect(event, entry);
        }
      }}
    >
      {children}
    </tr>
  );
}
