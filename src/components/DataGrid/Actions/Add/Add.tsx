import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AddDialog } from './AddDialog';
import { Plus } from 'tabler-icons-react';

export function Add() {
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

      <AddDialog
        opened={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
}
