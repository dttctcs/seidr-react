import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { EditDialog } from './EditDialog';
import { Pencil } from 'tabler-icons-react';

export function Edit({ id }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Edit">
        <ActionIcon
          size="sm"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Pencil />
        </ActionIcon>
      </Tooltip>

      <EditDialog id={id} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
