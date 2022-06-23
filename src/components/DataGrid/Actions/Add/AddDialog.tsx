import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Modal, Group, Stack } from '@mantine/core';
import { FormField } from '../../FormField';

export function AddDialog({ opened, onClose, onAddEntry, columns, schema, defaultValues }) {
  const { handleSubmit, reset, control } = useForm({
    mode: 'onTouched',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      onAddEntry(data);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Add Item"
    >
      <Stack spacing="md">
        {columns.map((item, index) => (
          <FormField
            key={item.name}
            name={item.name}
            control={control}
            label={`${item.name}${item.required ? '*' : ''}`}
            schema={item}
          />
        ))}
        <Group position="right" mt="xl">
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
