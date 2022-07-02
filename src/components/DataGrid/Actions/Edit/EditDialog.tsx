import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Group, Modal, Stack } from '@mantine/core';

import { FormField } from '../../FormField';

export function EditDialog({ opened, title, onClose, entry, onEditEntry, columns, schema, defaultValues }) {
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'onTouched',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) {
      for (const column of columns) {
        setValue(column.name, entry.result[column.name]);
      }
    }
  }, [entry, columns, setValue]);

  const onSubmit = async (data) => {
    try {
      onEditEntry(entry.id, data);
    } finally {
      reset();
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
      title={`${title}  (#${entry?.id})`}
      centered
    >
      <Stack spacing="md">
        {columns.map((item, index) => (
          <FormField
            key={item.name}
            name={item.name}
            control={control}
            label={`${item.label}${item.required ? '*' : ''}`}
            schema={item}
          />
        ))}
        <Group position="right" mt="xl">
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
