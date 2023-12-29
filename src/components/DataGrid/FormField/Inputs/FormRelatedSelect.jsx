
import { useController } from 'react-hook-form';

import { Select } from '@mantine/core';

export function FormRelatedSelect({ form, name, items, filter, ...props }) {
  const data = items.map((item) => ({ value: item.id.toString(), label: item.value }));

  return (
    <Select
      data={data}
      searchable
      {...form.getInputProps(name)}
      // onChange={(value) => {
      //   if (filter) {
      //     inputProps.onChange(value);
      //     return;
      //   }
      //   const newItem = items.find((item) => item.id.toString() === value);
      //   inputProps.onChange(newItem);
      // }}
      {...props}
    />
  );
}
