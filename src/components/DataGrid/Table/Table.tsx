import React from 'react';

import { Table as MantineTable } from '@mantine/core';
import { ScrollArea } from '../../ScrollArea';
import { Header } from '../Header';
import { Body } from '../Body';

export function Table({
  path,
  data,
  info,
  order,
  settings,
  dispatch,
  hideActions,

  loading,
  onSelect,

  onViewEntry,
  onEditEntry,
  onDeleteEntry,
  ViewComponent,
  EditComponent,
}) {
  return (
    <ScrollArea style={{ flex: 1, flexDirection: 'column' }}>
      <MantineTable
        verticalSpacing={settings.dense ? 'xs' : 'md'}
        horizontalSpacing={settings.dense ? 'xs' : 'md'}
        fontSize={settings.dense ? 'sm' : 'md'}
        striped={settings.striped}
        highlightOnHover={data.result.length && !!onSelect}
      >
        <Header
          data={data}
          info={info}
          settings={settings}
          order={order}
          onSortBy={(column) => dispatch({ type: 'setOrder', payload: column })}
          hideActions={hideActions}
        />
        <Body
          path={path}
          data={data}
          info={info}
          settings={settings}
          dispatch={dispatch}
          loading={loading}
          onSelect={onSelect}
          onViewEntry={onViewEntry}
          onEditEntry={onEditEntry}
          onDeleteEntry={onDeleteEntry}
          ViewComponent={ViewComponent}
          EditComponent={EditComponent}
          hideActions={hideActions}
        />

        <div className="h-4" />
      </MantineTable>
    </ScrollArea>
  );
}
