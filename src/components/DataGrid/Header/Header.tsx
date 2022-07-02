import React from 'react';

import { FieldTitle } from './FieldTitle';

export const Header = React.memo(
  ({ data, info, settings, hideActions, order, onSortBy, classNames, styles, ...props }) => {
    return (
      <thead style={{ padding: 0 }}>
        <tr>
          {!hideActions ? <FieldTitle column="Actions" order={order} /> : null}
          {data.list_columns.map((column, index) => (
            <FieldTitle
              key={column}
              column={column}
              label={data.label_columns[column]}
              order={order}
              selectable={data.order_columns.includes(column)}
              related={info.filters[column]?.schema.type === 'Nested'}
              rtl={settings.rtl}
              onSortBy={onSortBy}
            />
          ))}
        </tr>
      </thead>
    );
  },
);

Header.displayName = 'Header';
