import { useEffect, useState } from 'react';
import { useApi } from '../SeidrApiProvider';

import { Group, Modal, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

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
      opened={dialogOpen}
      onClose={() => setDialogOpen(false)}
      title={
        <Group>
          <IconAlertCircle size={16} color='red' />
          <Text>{error ? error.originalError.message : 'Error'}</Text>
        </Group>
      }
      centered
    >
      {error ? <Text>{error.message}</Text> : null}
    </Modal>
  );
}
