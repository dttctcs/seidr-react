import React, { useEffect } from 'react';
import { useApi } from '../../../SeidrApiProvider';
import { dirtyValues, getJsonValue } from '../../utils';

import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';

import { Button, Group, Modal, ScrollArea, Stack, Box } from '@mantine/core';

import { FormField } from '../../FormField';

function loadInitialValues(item, info){
  return new Promise((resolve) => {
    resolve(getJsonValue(item, info.edit.columns))
  })
}
export function EditDialog({ item, info, opened, onClose }) {
  const { updateEntry } = useApi();
  
  const form = useForm({
    initialValues: info.edit.defaultValues,
    validate: yupResolver(info.edit.schema),
  })
  
  const getDirtyFields = () => {
    const dirtyFields = {};
    Object.keys(form.values).forEach((fieldName) => {
      if (form.isDirty(fieldName)) {
        dirtyFields[fieldName] = true;
      }
    });
    return dirtyFields;
  };
  
  useEffect(() => {
    if(item){
      loadInitialValues(item, info).then((values) => {
        form.setValues(values);
        form.resetDirty(values);
      });
    }
  }, [item, info.edit.columns]);

  const handleSubmit = async (data) => {
    data = dirtyValues(getDirtyFields(), data);
    await updateEntry(item.id, data);
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
