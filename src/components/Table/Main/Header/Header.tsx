import React from 'react';
import { useTable } from '../../../TableProvider';
import { Settings } from '../../types';

import { FieldTitle } from './FieldTitle';

interface HeaderProps {
  settings: Settings;
  hideActions: boolean;
}

export const Header = React.memo<HeaderProps>(({ settings, hideActions }) => {
  const { data, info } = useTable();

  return (
    <thead style={{ padding: 0 }}>
      <tr>
        {!hideActions ? <FieldTitle column="Actions" rtl={settings.rtl} /> : null}
        {data.list_columns.map((column, index) => (
          <FieldTitle
            key={column}
            column={column}
            label={data.label_columns[column]}
            selectable={data.order_columns.includes(column)}
            related={info.filters[column]?.schema.type === 'Nested'}
            rtl={settings.rtl}
          />
        ))}
      </tr>
    </thead>
  );
});

Header.displayName = 'Header';
