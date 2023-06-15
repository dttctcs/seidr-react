
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

  const currentItem = inputProps.value || '';
  return <TextInput ref={ref} {...inputProps} error={error ? error.message : null} value={currentItem} {...props} />;
}
