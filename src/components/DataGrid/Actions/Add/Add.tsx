import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AddDialog } from './AddDialog';
import { Plus } from 'tabler-icons-react';

export function Add({ onAddEntry, AddComponent, ...props }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Add Item">
        <ActionIcon
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Plus />
        </ActionIcon>
      </Tooltip>
      {AddComponent ? (
        <AddComponent
          opened={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          columns={props.columns.reduce((previous, current) => ({ ...previous, [current.name]: current }), {})}
          onAddEntry={onAddEntry}
        />
      ) : (
        <AddDialog
          opened={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          onAddEntry={onAddEntry}
          {...props}
        />
      )}
    </>
  );
}
