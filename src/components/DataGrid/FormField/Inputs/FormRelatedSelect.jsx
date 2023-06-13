
import { useController } from 'react-hook-form';

import { Select } from '@mantine/core';

export function FormRelatedSelect({ control, name, items, filter, ...props }) {
  const {
    field: { ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const data = items.map((item) => ({ value: item.id.toString(), label: item.value }));

  let currentItem = null;
  if (filter && inputProps.value) {
    currentItem = inputProps.value.toString();
  } else if (inputProps.value?.id) {
    currentItem = inputProps.value.id.toString();
  }

  return (
    <Select
      data={data}
      error={error ? error.message : null}
      {...inputProps}
      value={currentItem}
      onChange={(value) => {
        if (filter) {
          inputProps.onChange(value);
          return;
        }
        const newItem = items.find((item) => item.id.toString() === value);
        inputProps.onChange(newItem);
      }}
      searchable
      {...props}
    />
  );
}
