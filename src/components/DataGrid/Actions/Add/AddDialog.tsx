import React from 'react';
import { useApi } from '../../../SeidrApiProvider';
import { dirtyValues } from '../../utils';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Modal, Group, Stack } from '@mantine/core';
import { FormField } from '../../FormField';
import { FormValues } from '../../types';

interface AddDialogProps {
  opened: boolean;
  onClose: () => void;
}

export function AddDialog({ opened, onClose }: AddDialogProps) {
  const { info, addEntry } = useApi();
  const { handleSubmit, reset, formState, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: info.add.defaultValues,
    resolver: yupResolver(info.add.schema),
  });

  // leave this here, if fomrState.dirtyFields is not read, we won't get the actual value on submit,
  // since it is a proxy object //see https://github.com/react-hook-form/react-hook-form/issues/3402
  const { dirty } = formState.dirtyFields;
  const onSubmit = async (data: any) => {
    data = dirtyValues(formState.dirtyFields, data);

    await addEntry(data);
    reset();
    onClose();
  };

  return (
    <Modal
      styles={{ root: { zIndex: 3000 } }}
      opened={opened}
      onClose={() => {
        reset();
        onClose();
      }}
      title={info.add.title}
      size="lg"
      centered
    >
      <Stack spacing="md">
        {info.add.columns.map((item: any) => (
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
