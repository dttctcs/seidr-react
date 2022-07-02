import React, { useState } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AlertDialog } from '../../../AlertDialog';
import { Trash } from 'tabler-icons-react';

function DeleteEntry({ id, onDeleteEntry, selected }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReject = () => {
    setDialogOpen(false);
  };

  const handleAccept = async () => {
    await onDeleteEntry(id);
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

export default DeleteEntry;
