import React, { ReactNode } from 'react';
import classes from './Row.module.css'

export function Row({ entry, selected, hover, onSelect, setSelectedItem, children }) {

  return (
    <tr
        className={`${classes.row} ${selected ? classes.selected : ''}`}
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
