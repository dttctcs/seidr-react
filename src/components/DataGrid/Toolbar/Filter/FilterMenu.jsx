import { Fragment, useEffect } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

import { ActionIcon, Box, Button, Divider, Group, Text } from '@mantine/core';
import { FormField } from '../../FormField';
import FormFilterField from './FormFilterField';
import FormOperatorField from './FormOperatorField';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { FormFilterIn } from './FormFilterIn';

const schema = yup.object({
  filters: yup.array().of(
    yup.object({
      col: yup.string().required('Column is required'),
      opr: yup.string().required('Operation is required'),
      value: yup.mixed().required('Value is required'),
    }),
  ),
});

export function FilterMenu({ onClose }) {
  const { info, queryParams, setQueryParams } = useApi();

  const { handleSubmit, control, setValue, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      filters: [],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'filters' });
  const watchFieldArray = watch('filters');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  useEffect(() => {
    if (queryParams.filters && queryParams.filters.length) {
      setValue('filters', JSON.parse(JSON.stringify(queryParams.filters)));
    }
  }, [queryParams.filters, setValue]);

  const onSubmit = (data) => {
    const filters = JSON.parse(JSON.stringify(data.filters));

    filters.forEach((filter) => {
      if (filter.opr === 'in' && Array.isArray(filter.value) && filter.value.length > 0) {
        filter.value = JSON.stringify(filter.value);
      }
    });
    setQueryParams({ filters });
    onClose();
  };

  return (
    <>
      {controlledFields.length ? (
        controlledFields.map((field, index) => {
          return (
            <Fragment key={field.id}>
              <Group mt='lg' spacing='md' noWrap>
                <Box sx={{ width: '192px' }}>
                  <FormFilterField
                    name={`filters.${index}.col`}
                    control={control}
                    items={info && info.filters ? Object.keys(info.filters) : []}
                    onChange={(newValue) => {
                      update(index, { col: newValue, value: '', opr: '' });
                    }}
                  />
                </Box>

                <Box sx={{ width: '192px' }}>
                  {field.col ? (
                    <FormOperatorField
                      name={`filters.${index}.opr`}
                      control={control}
                      items={info.filters[field.col].filters.map((value) => ({
                        label: value.name,
                        value: value.operator,
                      }))}
                    />
                  ) : null}
                </Box>
                <Box sx={{ width: '192px' }}>
                  {field.col ? (
                    field.opr === 'in' ? (
                      <FormFilterIn name={`filters.${index}.value`} control={control} />
                    ) : (
                      <FormField
                        name={`filters.${index}.value`}
                        control={control}
                        schema={info.filters[field.col].schema}
                        filter
                      />
                    )
                  ) : null}
                </Box>
                <ActionIcon
                  size='xs'
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <IconTrash />
                </ActionIcon>
              </Group>
              {controlledFields.length > 1 && index < controlledFields.length - 1 ? (
                <Divider
                  sx={(theme) => ({
                    color: `${theme.colors[theme.primaryColor][theme.fn.primaryShade()]} !important`,
                  })}
                  my='md'
                  labelPosition='center'
                  label='AND'
                />
              ) : null}
            </Fragment>
          );
        })
      ) : (
        <Box sx={{ width: '642px' }}>
          <Text sx={(theme) => ({ fontStyle: 'italic', padding: '7px' })} size='sm' color='dimmed'>
            No filters selected...
          </Text>
        </Box>
      )}
      <Divider my='xl' />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant='subtle'
          leftIcon={<IconPlus />}
          onClick={() => {
            append({ col: '', opr: '', value: '' });
          }}
        >
          Add Filter
        </Button>
        <Group spacing='md'>
          <Button onClick={handleSubmit(onSubmit)}>Apply</Button>
        </Group>
      </Box>
    </>
  );
}
