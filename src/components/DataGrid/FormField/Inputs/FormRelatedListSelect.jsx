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

  const data = items.map((item) => ({ value: String(item.id), label: item.value }));
  const currentItems = Array.isArray(inputProps.value) ? inputProps.value.map((value) => String(value.id)) : [];

  return (
    <MultiSelect
      ref={ref}
      data={data}
      error={error ? error.message : null}
      searchable
      {...inputProps}
      onChange={(values) => {
        const transformedValues = values.map(String).map((id) => {
          const matchingItem = items.find((item) => String(item.id) === id);
          return matchingItem ? { ...matchingItem } : null;
        });
        inputProps.onChange(transformedValues.filter((item) => item !== null));
      }}
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
