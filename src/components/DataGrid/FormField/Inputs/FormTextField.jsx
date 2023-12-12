
import { useController } from 'react-hook-form';

import { TextInput, PasswordInput } from '@mantine/core';

export function FormTextField({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const currentItem = inputProps.value || '';
  return name === "password" ? <PasswordInput ref={ref} {...inputProps} error={error ? error.message : null} value={String(currentItem)} {...props} />:
  <TextInput ref={ref} {...inputProps} error={error ? error.message : null} value={currentItem} {...props} />;
}
