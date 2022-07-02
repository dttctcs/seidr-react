import React from 'react';
import applyStyles from './Row.styles';

export function Row({ entry, selected, striped, onSelect, setSelectedItem, children, classNames, styles }) {
  const { classes } = applyStyles(
    { selected, selectable: !!onSelect, striped },
    { classNames, styles, name: 'DataGrid' },
  );

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
