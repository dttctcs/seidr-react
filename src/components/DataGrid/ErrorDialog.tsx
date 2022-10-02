import React, { useEffect, useState } from 'react';
import { useApi } from '../SeidrApiProvider';

import { Group, Modal, Text } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

export function ErrorDialog() {
  const { error } = useApi();

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setDialogOpen(true);
    }
  }, [error]);

  return (
    <Modal
      styles={{ root: { zIndex: 3000 } }}
      opened={dialogOpen}
      onClose={() => setDialogOpen(false)}
      title={
        <Group>
          <AlertCircle size={16} color="red" />
          <Text>Error</Text>
        </Group>
      }
      centered
    >
      {error ? (
        <>
          <Text>{error.message}</Text>
        </>
      ) : null}
    </Modal>
  );
}
