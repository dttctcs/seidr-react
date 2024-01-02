import React from 'react';

import { useApi } from '../../../SeidrApiProvider';

import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';

import { Button, Modal, Group, Stack, Box } from '@mantine/core';
import { FormField } from '../../FormField';

export function AddDialog({ opened, onClose }) {
  const { info, addEntry } = useApi();
  
  const form = useForm({
    initialValues: info.add.defaultValues,
    validate: yupResolver(info.add.schema),
  })

  const handleSubmit = async (data) => {
    await addEntry(data);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        onClose();
      }}
      title={info.add.title}
      size='lg'
      centered
    >
      <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing='md'>
          {info.add.columns.map((item) => (
            <FormField
              form={form}
              key={item.name}
              name={item.name}
              label={item.name}
              description={item.description}
              schema={item}
              withAsterisk={item.required}
            />
          ))}
          <Group position='right' mt='xl'>
            <Button type='submit' >Add</Button>
          </Group>
        </Stack>
      </Box>
    </Modal>
  );
}
