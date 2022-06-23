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
          sx={(theme) => ({
            '&:hover': {
              backgroundColor: selected ? theme.fn.rgba(theme.colors.gray[0], 0.45) : undefined,
            },
          })}
          size="sm"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Trash color={selected ? 'white' : undefined} />
        </ActionIcon>
      </Tooltip>
      <AlertDialog open={dialogOpen} onClose={handleReject} handleAccept={handleAccept} handleReject={handleReject} />
    </>
  );
}

export default DeleteEntry;
