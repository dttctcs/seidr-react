import React, { useState } from 'react';
import { useSeidrApi } from '../../../SeidrProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { EditDialog } from './EditDialog';
import { Pencil } from 'tabler-icons-react';

export function Edit({ id, path, onEditEntry, EditComponent, selected, ...props }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [entry, setEntry] = useState(null);
  const { fetchEntry } = useSeidrApi();

  return (
    <>
      <Tooltip label="Edit">
        <ActionIcon
          size="sm"
          onClick={() => {
            const entryPromise = fetchEntry(path, id);

            entryPromise.then((data) => {
              setEntry(data);
              setDialogOpen(true);
            });
          }}
        >
          <Pencil />
        </ActionIcon>
      </Tooltip>

      {EditComponent ? (
        <EditComponent
          opened={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          columns={props.columns.reduce((previous, current) => ({ ...previous, [current.name]: current }), {})}
          entry={entry}
          onEditEntry={onEditEntry}
          {...props}
        />
      ) : (
        <EditDialog
          opened={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          entry={entry}
          onEditEntry={onEditEntry}
          {...props}
        />
      )}
    </>
  );
}
