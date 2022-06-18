import React, { useState } from 'react';
import { getValue } from './utils';

import { Box, Table, TableBody, TableRow } from '@mui/material';
import DataGridHead from './DataGridHead/DataGridHead';
import DataGridCell from './DataGridCell';
import ViewEntryButton from './View/ViewEntryButton';
import EditEntryButton from './Edit/EditEntryButton';
import DeleteEntry from './Delete/DeleteEntry';
import { ScrollArea } from '../ScrollArea';

/**
 * Primary UI component
 */
function DataGridBody({
  path,
  state,
  dispatch,
  loading,
  onSelect,

  onViewEntry,
  onEditEntry,
  onDeleteEntry,
  ViewEntryComponent,
  EditEntryComponent,
  hideActions,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ScrollArea style={{ flex: 1, flexDirection: 'column' }}>
      <Table size={state.settings.dense ? 'small' : 'medium'} stickyHeader>
        <DataGridHead
          state={state}
          onSortBy={(column) => dispatch({ type: 'setOrder', payload: column })}
          hideActions={hideActions}
        />
        <TableBody>
          {state.data.result.length ? (
            state.data.result.map((entry, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: entry === selectedItem ? 'primary.main' : null,

                    ':nth-of-type(even)': {
                      bgcolor: state.settings.striped ? (entry !== selectedItem ? 'action.hover' : null) : null,
                    },

                    '&.MuiTableRow-hover:hover': {
                      cursor: 'pointer',

                      bgcolor: (theme) =>
                        entry === selectedItem ? theme.palette.primary.dark : theme.palette.action.focus,
                    },
                    ':hover': {
                      cursor: onSelect ? 'pointer' : 'default',
                    },
                  }}
                  onClick={(event) => {
                    if (onSelect) {
                      setSelectedItem(entry);
                      onSelect(event, { ...entry, id: state.data.ids[index] });
                    }
                  }}
                  hover={onSelect ? true : false}
                >
                  {!hideActions ? (
                    <DataGridCell
                      sx={{ py: state.settings.dense ? 0 : 1 }}
                      loading={loading}
                      rightBorder={state.settings.cellRightBorder}
                    >
                      <Box
                        sx={{
                          px: 0.5,
                          display: 'flex',
                          justifyContent: state.settings.rtl ? 'flex-end' : 'flex-start',
                          color: entry === selectedItem ? 'common.white' : null,
                        }}
                      >
                        {state.info.permissions.includes('can_get') ? (
                          <ViewEntryButton
                            id={state.data.ids[index]}
                            relations={state.info.relations}
                            ViewEntryComponent={ViewEntryComponent}
                            onViewEntry={onViewEntry}
                            selected={entry === selectedItem}
                          />
                        ) : null}
                        {state.info.permissions.includes('can_put') ? (
                          <EditEntryButton
                            id={state.data.ids[index]}
                            path={path}
                            EditEntryComponent={EditEntryComponent}
                            onEditEntry={onEditEntry}
                            selected={entry === selectedItem}
                            {...state.info.edit}
                          />
                        ) : null}
                        {state.info.permissions.includes('can_delete') ? (
                          <DeleteEntry
                            id={state.data.ids[index]}
                            onDeleteEntry={onDeleteEntry}
                            selected={entry === selectedItem}
                          />
                        ) : null}
                      </Box>
                    </DataGridCell>
                  ) : null}
                  {state.data.list_columns.map((column, index) => (
                    <DataGridCell
                      key={index}
                      sx={{
                        color: entry === selectedItem ? 'common.white' : null,
                        py: state.settings.dense ? 0 : 1,
                      }}
                      rtl={state.settings.rtl}
                      rightBorder={state.settings.cellRightBorder}
                      loading={loading}
                    >
                      {getValue(entry[column])}
                    </DataGridCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <DataGridCell
                sx={{
                  p: 2,
                  typography: 'body2',
                  color: 'grey.500',
                  fontStyle: 'italic',
                  borderBottom: 'none',
                }}
                loading={loading}
                colSpan={state.data.list_columns.length + 1}
              >
                No data available...
              </DataGridCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default DataGridBody;
