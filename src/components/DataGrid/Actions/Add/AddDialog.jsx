import React from 'react';

import { useApi } from '../../../SeidrApiProvider';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Modal, Group, Stack } from '@mantine/core';
import { FormField } from '../../FormField';


export function AddDialog({ opened, onClose }) {
  const { info, addEntry } = useApi();

  const { handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    defaultValues: info.add.defaultValues,
    resolver: yupResolver(info.add.schema),
  });

  const onSubmit = async (data) => {
    data.active = data.active === "true" ? 1 : 0;
    await addEntry(data);
    reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        reset();
        onClose();
      }}
      title={info.add.title}
      size='lg'
      centered
    >
      <Stack spacing='md'>
        {info.add.columns.map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            control={control}
            label={`${item.name}${item.required ? '*' : ''}`}
            description={item.description}
            schema={item}
          />
        ))}
        <Group position='right' mt='xl'>
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
