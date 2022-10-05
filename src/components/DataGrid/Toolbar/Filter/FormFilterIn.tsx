import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (inputProps.value) {
      const currentItems = JSON.parse(inputProps.value);
      setData([...currentItems]);
      inputProps.onChange(currentItems);
    } else {
      inputProps.onChange([]);
    }
  }, []);

  return (
    <MultiSelect
      ref={ref}
      data={data}
      placeholder="Enter items"
      searchable
      creatable
      error={error ? error.message : null}
      {...inputProps}
      value={inputProps.value}
      getCreateLabel={(query) => `+ Add ${query}`}
      onCreate={(query) => {
        setData((current) => [...current, query]);
        return query;
      }}
      onChange={(values) => {
        console.log(values);
        inputProps.onChange(values);
      }}
    />
  );
}
