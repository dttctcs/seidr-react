import React from 'react';
import applyStyles from './Row.styles';

export function Row({ selected, entry, state, onSelect, setSelectedItem, children, classNames, styles, ...props }) {
  const { classes, cx, theme } = applyStyles(
    { selected, selectable: !!onSelect, striped: state.settings.striped },
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
