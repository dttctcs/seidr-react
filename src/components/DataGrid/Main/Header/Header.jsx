import React from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { FieldTitle } from './FieldTitle';

export const Header = React.memo(({ settings, hideActions }) => {
  const { data, info } = useApi();

  return (
    <thead style={{ padding: 0 }}>
      <tr>
        {!hideActions ? <FieldTitle column="Actions" rtl={settings.rtl} /> : null}
        {data.list_columns.map((column, index) => (
          <FieldTitle
            key={column}
            column={column}
            label={data.label_columns[column]}
            selecDataGrid={data.order_columns.includes(column)}
            related={info.filters[column]?.schema.type === 'Nested'}
            rtl={settings.rtl}
          />
        ))}
      </tr>
    </thead>
  );
});

Header.displayName = 'Header';
