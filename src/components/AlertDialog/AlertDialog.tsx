import React from 'react';

import { Button, Group, Modal } from '@mantine/core';

export function AlertDialog({ opened, onClose, handleAccept, handleReject }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      title="Item löschen?"
      centered
    >
      Sind Sie Sicher, dass Sie das Item löschen wollen?
      <Group position="right" mt="xl">
        <Button onClick={handleReject} variant="default">
          Abbrechen
        </Button>
        <Button onClick={handleAccept} color="red">
          Löschen
        </Button>
      </Group>
    </Modal>
  );
}
