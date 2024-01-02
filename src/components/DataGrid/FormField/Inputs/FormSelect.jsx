import { Select } from '@mantine/core';

export function FormSelect({ form, name, items, ...props }) {

  return (
    <Select 
      data={items} 
      searchable 
      {...form.getInputProps(name)} 
      {...props} 
    />
  );
}
