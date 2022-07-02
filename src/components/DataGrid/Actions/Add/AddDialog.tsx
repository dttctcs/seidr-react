import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Modal, Group, Stack } from '@mantine/core';
import { FormField } from '../../FormField';

export function AddDialog({ opened, title, onClose, onAddEntry, columns, schema, defaultValues }) {
  const { handleSubmit, reset, control } = useForm({
    mode: 'onTouched',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      onAddEntry(data);
    } finally {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        reset();
        onClose();
      }}
      title={title}
      centered
    >
      <Stack spacing="md">
        {columns.map((item) => (
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
