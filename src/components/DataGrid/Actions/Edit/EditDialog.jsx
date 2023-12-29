import React, { useEffect } from 'react';
import { useApi } from '../../../SeidrApiProvider';
import { dirtyValues } from '../../utils';

import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';

import { Button, Group, Modal, ScrollArea, Stack, Box } from '@mantine/core';

import { FormField } from '../../FormField';

export function EditDialog({ item, info, opened, onClose }) {
  const { updateEntry } = useApi();
  
  const form = useForm({
    initialValues: info.edit.defaultValues,
    validate: yupResolver(info.edit.schema),
  })

  const getJsonValue = (item, columns) => {
    const JsonValue ={}
    columns.forEach((column) => {
      JsonValue[column.name] = 
        typeof item.result[column.name] == 'boolean' ? 
        String(item.result[column.name]) : item.result[column.name]
    })
    return JsonValue;
  }

  useEffect(() => {
    if(item) form.setValues(getJsonValue(item, info.edit.columns));
  }, [item, info.edit.columns]);

  // This has to bere here. dirtyFields won't include the changes if not,
  // since it is a proxy object //see https://github.com/react-hook-form/react-hook-form/issues/3402
  // const { dirty } = formState.dirtyFields;
  const handleSubmit = async (data) => {
    // data = dirtyValues(formState.dirtyFields, data);
    data.active = data.active === "true" ? 1 : data.active === "false" ? 0 : null;
    console.log(data)
    await updateEntry(item.id, data);
    form.reset();
    onClose();
  };

  if (!item) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={info.edit.title}
      size='lg'
      centered
    >
      <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing='md'>
          <ScrollArea h={450}  type="auto" >
          {
            info.edit.columns.map((item, index) => (
              <FormField
                form={form}
                key={index}
                name={item.name}
                label={item.label}
                description={item.description}
                schema={item}
                withAsterisk={item.required}
                />
                ))
              }
          <Group position='right' mt='xl'>
            <Button type='submit'>Save</Button>
          </Group>
          </ScrollArea>
        </Stack>
      </Box>
    </Modal>
  );
}
