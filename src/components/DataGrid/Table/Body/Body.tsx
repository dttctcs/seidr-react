import React, { useState } from 'react';
import { getValue } from '../../utils';

import { Text } from '@mantine/core';
import { Row } from './Row';
import { Field } from './Field';
import { Actions } from '../../Actions';

export function Body({
  path,
  data,
  info,
  settings,

  loading,
  onSelect,

  onEditEntry,
  onDeleteEntry,
  ViewComponent,
  EditComponent,
  hideActions,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <tbody>
      {data.result.length ? (
        data.result.map((entry, index) => {
          const id = data.ids[index];

          return (
            <Row
              key={index}
              entry={entry}
              striped={settings.striped}
              selected={selectedItem?.id === id}
              setSelectedItem={setSelectedItem}
              onSelect={onSelect}
            >
              {!hideActions ? (
                <Field rtl={settings.rtl} rightBorder={settings.rightBorder} loading={loading}>
                  <Actions
                    id={data.ids[index]}
                    path={path}
                    info={info}
                    selected={selectedItem?.id === id}
                    rtl={settings.rtl}
                    EditComponent={EditComponent}
                    onEditEntry={onEditEntry}
                    ViewComponent={ViewComponent}
                    onDeleteEntry={onDeleteEntry}
                  />
                </Field>
              ) : null}
              {data.list_columns.map((column, columnIndex) => (
                <Field key={columnIndex} rtl={settings.rtl} rightBorder={settings.rightBorder} loading={loading}>
                  {getValue(entry[column])}
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
            <Text sx={{ fontStyle: 'italic' }} size="sm" color="dimmed">
              No data available...
            </Text>
          </td>
        </tr>
      )}
    </tbody>
  );
}
