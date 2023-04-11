import React, { useState } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import { ActionIcon, Tooltip } from '@mantine/core';
import { AlertDialog } from '../../../AlertDialog';
import { IconTrash } from '@tabler/icons-react';

interface DeleteProps {
  id: number;
}

export function Delete({ id }: DeleteProps) {
  const { deleteEntry } = useApi();

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
      <Tooltip label='Delete'>
        <ActionIcon
          size='sm'
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      <AlertDialog opened={dialogOpen} onClose={handleReject} handleAccept={handleAccept} handleReject={handleReject} />
    </>
  );
}
