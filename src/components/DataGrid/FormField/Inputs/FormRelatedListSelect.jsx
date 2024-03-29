import { MultiSelect } from '@mantine/core';

export function FormRelatedListSelect({ form, name, items, ...props }) {

  const data = items.map((item) => ({ value: String(item.id), label: item.value }));
  const currentItems = Array.isArray(form.getInputProps(name).value)
    ? form.getInputProps(name).value.map((value) => (typeof value === 'object' ? String(value.id) : String(value)))
    : [];

  return (
    <MultiSelect
    data={data}
    searchable
    {...form.getInputProps(name)}
    value={currentItems}
    {...props}
    />
  );
}


/*

import { useController } from 'react-hook-form';

import { MultiSelect } from '@mantine/core';

export function FormRelatedListSelect({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const data = items.map((item) => ({ value: item.id, label: item.value }));
  const currentItems = inputProps.value.map((value) => value.id);

  return (
    <MultiSelect
      ref={ref}
      data={data}
      error={error ? error.message : null}
      searchable
      {...inputProps}
      value={currentItems}
      onChange={(values) => {
        const transformedValues = [];
        values.forEach((id) => {
          transformedValues.push(items.find((item) => item.id === id));
        });
        inputProps.onChange(transformedValues);
      }}
      {...props}
    />
  );
}
*/
