import React from 'react';
import { useController } from 'react-hook-form';

import { TextInput } from '@mantine/core';

export function FormTextField({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <TextInput ref={ref} {...inputProps} error={error ? error.message : null} {...props} />;
}
