
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

  return <Select ref={ref} data={items} error={error ? error.message : null} searchable {...inputProps} {...props} />;
}
