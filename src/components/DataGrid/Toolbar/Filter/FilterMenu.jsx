import { Fragment, useEffect } from 'react';
import { useApi } from '../../../SeidrApiProvider';

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';

import { useForm } from '@mantine/form';
import { ActionIcon, Box, Button, Divider, Group, Text } from '@mantine/core';
import { FormField } from '../../FormField';
import FormFilterField from './FormFilterField';
import FormOperatorField from './FormOperatorField';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { FormFilterIn } from './FormFilterIn';
import classes from '../../DataGrid.module.css'
import { randomId } from '@mantine/hooks';

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
  const form = useForm({
    initialValues: {
      filters: []
    },
    validate: yupResolver(schema)
  })

  useEffect(() => {
    if (queryParams.filters && queryParams.filters.length) {
      // Add the 'key' property
      const filtersWithKey = queryParams.filters.map(filter => ({
        ...filter,
        key: randomId(),
      }));
      form.setFieldValue(`filters`, filtersWithKey);
    }
  }, [queryParams.filters]);

  const handleSubmit = (data) => {
    // Remove the 'key' property from each filter
    const filtersWithoutKey = data.filters.map(({ key, ...rest }) => rest);

    const filters = JSON.parse(JSON.stringify(filtersWithoutKey));

    filters.forEach((filter) => {
      if (filter.opr === 'in' && Array.isArray(filter.value) && filter.value.length > 0) {
        filter.value = JSON.stringify(filter.value);
      }
    });
    setQueryParams({ filters, page: 0 });
    onClose();
  };

  const fields = form.values.filters.map((item, index) => (
    <Fragment key={item.key}>
      <Group mt='lg' spacing='md' style={{whiteSpace: 'nowrap'}}>
        <Box style={{ width: '192px' }}>
          {info && info.filters && (
            <FormFilterField
              form={form}
              name={`filters.${index}.col`}
              items={Object.entries(info.filters).map(([property, value]) => ({
                label: value.label,
                value: String(property),
              }))}
              onChange={(newValue) => {
                form.setFieldValue(`filters.${index}`, { col: newValue, opr: '', value: '', key: randomId() });
              }}
            />
          )}
        </Box>

        <Box style={{ width: '192px' }}>
          {item.col ? (
            <FormOperatorField
              form={form}
              name={`filters.${index}.opr`}
              items={info.filters[item.col].filters.map((value) => ({
                label: value.name,
                value: value.operator,
              }))}
              onChange={(newValue) => {
                form.setFieldValue(`filters.${index}`, { col: form.values.filters[index].col, opr: newValue, value: '', key: randomId() });
              }}
            />
          ) : null}
        </Box>
        <Box style={{ width: '192px' }}>
          {item.col ? (
            item.opr === 'in' ? (
              <FormFilterIn form={form} name={`filters.${index}.value`} />
            ) : (
              <FormField
                form={form}
                name={`filters.${index}.value`}
                schema={info.filters[item.col].schema}
                filter
              />
            )
          ) : null}
        </Box>
        <ActionIcon
          size='xs'
          className={classes.icon}
          onClick={() => {
            form.removeListItem("filters", index);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
      {form.values.filters.length > 1 && index < form.values.filters.length - 1 ? (
        <Divider
          my='md'
          labelPosition='center'
          label='AND'
        />
      ) : null}
    </Fragment>
  ));

  return (
    <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
      {fields.length === 0 && (
          <Box style={{ width: '642px' }}>
          <Text style={({ fontStyle: 'italic', padding: '7px' })} size='sm' c={'dimmed'}>
            No filters selected...
          </Text>
        </Box>
      )}
      {fields}
      <Divider my='xl' />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant='subtle'
          leftSection={<IconPlus />}
          onClick={() => {
            form.insertListItem('filters', { col: '', opr: '', value: '', key:randomId()});
          }}
        >
          Add Filter
        </Button>
        <Group spacing='md'>
          <Button type='submit'>Apply</Button>
        </Group>
      </Box>
    </Box>
  );
}
