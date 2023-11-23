import { useState } from 'react';
import { getValue } from '../../utils';
import { useApi } from '../../../SeidrApiProvider';

import { Text } from '@mantine/core';
import { Row } from './Row';
import { Field } from './Field';
import { Actions } from '../../Actions';

export function Body({
  settings,

  loading,
  onSelect,

  hideActions,
}) {
  const { data } = useApi();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <tbody>
      {data.result.length ? (
        data.result.map((entry, index) => {
          const id = data.ids[index];

          return (
            <Row
              key={index}
              entry={{ ...entry, id }}
              selected={selectedItem?.id === id}
              setSelectedItem={setSelectedItem}
              onSelect={onSelect}
            >
              {!hideActions ? (
                <Field loading={loading}>
                  <Actions id={data.ids[index]} selected={selectedItem?.id === id}/>
                </Field>
              ) : null}
              {data.list_columns.map((column, columnIndex) => (
                <Field style={{padding: 'var(--mantine-spacing-md)'}} key={columnIndex} loading={loading}>
                  {getValue(entry, column)}
                </Field>
              ))}
            </Row>
          );
        })
      ) : (
        <tr>
          <td
            style={{ padding: '8px' }}
            colSpan={hideActions ? data.list_columns.length : data.list_columns.length + 1}
          >
            <Text style={{ fontStyle: 'italic' }} size="sm" c="dimmed">
              No data available...
            </Text>
          </td>
        </tr>
      )}
    </tbody>
  );
}
