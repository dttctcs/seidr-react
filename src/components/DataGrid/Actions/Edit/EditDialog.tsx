import React, { useEffect } from 'react';
import { useApi } from '../../../SeidrApiProvider';
import { dirtyValues } from '../../utils';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Group, Modal, Stack } from '@mantine/core';

import { FormField } from '../../FormField';

export function EditDialog({ item, info, opened, onClose }) {
  const { updateEntry } = useApi();

  const { handleSubmit, reset, setValue, formState, control } = useForm({
    mode: 'onTouched',
    defaultValues: info.edit.defaultValues,
    resolver: yupResolver(info.edit.schema),
  });

  useEffect(() => {
    if (item) {
      for (const column of info.edit.columns) {
        setValue(column.name, item.result[column.name]);
      }
    }
  }, [item, info.edit.columns, setValue]);

  // since it is a proxy object //see https://github.com/react-hook-form/react-hook-form/issues/3402
  const { dirty } = formState.dirtyFields;
  const onSubmit = async (data) => {
    data = dirtyValues(formState.dirtyFields, data);

    await updateEntry(item.id, data);
    reset();
    onClose();
  };

  if (!item) {
    return null;
  }

  return (
    <Modal
      styles={{ root: { zIndex: 3000 } }}
      opened={opened}
      onClose={() => {
        onClose();
        reset();
      }}
      title={`${info.edit.title}  (#${item?.id})`}
      size="lg"
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
