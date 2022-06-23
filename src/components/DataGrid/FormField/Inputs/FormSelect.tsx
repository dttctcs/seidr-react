import React from 'react';
import { useController } from 'react-hook-form';

import { Select } from '@mantine/core';

export function FormSelect({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <Select ref={ref} data={items} searchable error={error ? error.message : null} {...inputProps} {...props} />;
}
