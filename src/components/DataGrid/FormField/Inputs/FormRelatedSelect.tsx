import React from 'react';
import { useController } from 'react-hook-form';

import { Select } from '@mantine/core';

export function FormRelatedSelect({ control, name, items, ...props }) {
  const {
    field: { ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const data = items.map((item) => ({ value: item.id.toString(), label: item.value }));
  const currentItem = inputProps.value?.id ? inputProps.value.id.toString() : null;

  return (
    <Select
      data={data}
      error={error ? error.message : null}
      {...inputProps}
      value={currentItem}
      onChange={(value) => {
        const newItem = items.find((item) => item.id.toString() === value);

        inputProps.onChange(newItem);
      }}
      searchable
      {...props}
    />
  );
}
