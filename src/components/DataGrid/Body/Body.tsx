import React, { useState } from 'react';
import { getValue } from '../utils';

import { Table, Text } from '@mantine/core';
import { Row } from './Row';
import { Header } from './Header';
import { Field } from './Field';
import { Actions } from '../Actions';

import { ScrollArea } from '../../ScrollArea';

export function Body({
  path,
  state,
  dispatch,
  loading,
  onSelect,

  onViewEntry,
  onEditEntry,
  onDeleteEntry,
  ViewComponent,
  EditComponent,
  hideActions,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ScrollArea style={{ flex: 1, flexDirection: 'column' }}>
      <Table striped={state.settings.striped} highlightOnHover={!!onSelect}>
        <tbody>
          <Header
            state={state}
            onSortBy={(column) => dispatch({ type: 'setOrder', payload: column })}
            hideActions={hideActions}
          />
          {state.data.result.length ? (
            state.data.result.map((entry, index) => {
              let id = state.data.ids[index];

              return (
                <Row
                  key={index}
                  selected={selectedItem?.id === id}
                  setSelectedItem={setSelectedItem}
                  onSelect={onSelect}
                  entry={entry}
                  state={state}
                >
                  {!hideActions ? (
                    <Field dense={state.settings.dense} rightBorder={state.settings.rightBorder} loading={loading}>
                      <Actions
                        id={state.data.ids[index]}
                        path={path}
                        info={state.info}
                        selected={selectedItem?.id === id}
                        rtl={state.settings.rtl}
                        EditComponent={EditComponent}
                        onEditEntry={onEditEntry}
                        ViewComponent={ViewComponent}
                        onViewEntry={onViewEntry}
                        onDeleteEntry={onDeleteEntry}
                      />
                    </Field>
                  ) : null}
                  {state.data.list_columns.map((column, index) => (
                    <Field
                      key={index}
                      rtl={state.settings.rtl}
                      rightBorder={state.settings.rightBorder}
                      loading={loading}
                    >
                      {getValue(entry[column])}
                    </Field>
                  ))}
                </Row>
              );
            })
          ) : (
            <td colSpan={hideActions ? state.data.list_columns.length : state.data.list_columns.length + 1}>
              <Text sx={{ padding: '4px', fontStyle: 'italic' }} size="sm" color="dimmed">
                No data available...
              </Text>
            </td>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
