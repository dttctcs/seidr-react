import React from 'react';
import applyStyles from './Header.styles';

import { Text } from '@mantine/core';
import { Field } from '../Field';
import { HeaderCell } from './HeaderCell';
import { FieldTitle } from '../FieldTitle';

export const Header = React.memo(({ state, onSortBy, hideActions, classNames, styles, ...props }) => {
  const { classes, cx, theme } = applyStyles({ hideActions }, { classNames, styles, name: 'DataGrid' });

  return (
    <tr className={classes.root}>
      {!hideActions ? <FieldTitle column={'Actions'} state={state} /> : null}
      {state.data.list_columns.map((column, index) => (
        <FieldTitle key={column} column={column} onSortBy={onSortBy} state={state} />
      ))}
    </tr>
  );
});
