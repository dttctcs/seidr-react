import React, { useEffect, useState } from 'react';
import { useTable } from '../../../TableProvider';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Group, Modal, Stack } from '@mantine/core';

import { FormField } from '../../FormField';

export function EditDialog({ id, opened, onClose }) {
  const { info, getEntry, updateEntry } = useTable();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'onTouched',
    defaultValues: info.edit.defaultValues,
    resolver: yupResolver(info.edit.schema),
  });

  useEffect(() => {
    setLoading(true);
    getEntry(id)
      .then((data) => setItem(data))
      .finally(() => setLoading(false));
  }, [opened]);

  useEffect(() => {
    if (item) {
      for (const column of info.edit.columns) {
        setValue(column.name, item.result[column.name]);
      }
    }
  }, [item, info.edit.columns, setValue]);

  const onSubmit = async (data) => {
    try {
      updateEntry(item.id, data);
    } finally {
      onClose();
      reset();
    }
  };

  if (!item) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        reset();
      }}
      title={`${info.edit.title}  (#${item?.id})`}
      centered
    >
      <Stack spacing="md">
        {info.edit.columns.map((item, index) => (
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
