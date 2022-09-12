import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { ViewDialog } from './ViewDialog';
import { Eye } from 'tabler-icons-react';

export function View({ id }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip label="Details">
        <ActionIcon
          size="sm"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Eye />
        </ActionIcon>
      </Tooltip>

      <ViewDialog id={id} opened={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
