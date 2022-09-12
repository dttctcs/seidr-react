import React, { useState } from 'react';
import { useTable } from '../../../TableProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AlertDialog } from '../../../AlertDialog';
import { Trash } from 'tabler-icons-react';

export function Delete({ id }) {
  const { deleteEntry } = useTable();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReject = () => {
    setDialogOpen(false);
  };

  const handleAccept = async () => {
    deleteEntry(id);
    setDialogOpen(false);
  };

  return (
    <>
      <Tooltip label="Delete">
        <ActionIcon
          size="sm"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Trash />
        </ActionIcon>
      </Tooltip>
      <AlertDialog opened={dialogOpen} onClose={handleReject} handleAccept={handleAccept} handleReject={handleReject} />
    </>
  );
}
