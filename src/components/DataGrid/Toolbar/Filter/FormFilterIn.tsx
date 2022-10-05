import React, { useState } from 'react';
import { useController } from 'react-hook-form';

import { MultiSelect } from '@mantine/core';

export function FormFilterIn({ control, name, ...props }) {
  const [data, setData] = useState([]);
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const currentItems = inputProps.value ? inputProps.value : [];

  return (
    <MultiSelect
      ref={ref}
      data={data}
      placeholder="Enter items"
      searchable
      creatable
      error={error ? error.message : null}
      {...inputProps}
      value={currentItems}
      getCreateLabel={(query) => `+ Add ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setData((current) => [...current, item]);
        return item;
      }}
      onChange={(values) => {
        console.log(values);
        inputProps.onChange(values);
      }}
    />
  );
}
