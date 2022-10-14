import React, { ReactNode } from 'react';
import applyStyles from './Row.styles';

interface RowProps {
  entry: any;
  selected: boolean;
  hover: boolean;

  onSelect: any;
  setSelectedItem: any;

  children: ReactNode;
}

export function Row({ entry, selected, hover, onSelect, setSelectedItem, children }: RowProps) {
  const { classes } = applyStyles({ selected, hover: onSelect || hover, pointer: !!onSelect }, { name: 'DataGrid' });

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
