import React from 'react';
import { useController } from 'react-hook-form';

import { Autocomplete } from '@mantine/core';

export function FormAutocomplete({ control, name, items, onChange, TextFieldProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <Autocomplete ref={ref} error={error ? error.message : null} data={items} {...inputProps} {...props} />;
}
