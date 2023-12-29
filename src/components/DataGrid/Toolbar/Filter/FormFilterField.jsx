import { Select } from '@mantine/core';

function FormFilterField({ form, name, items, onChange, ...props }) {

  return (
    <Select
      data={items}
      searchable
      {...form.getInputProps(name)}
      onChange={onChange}
      {...props}
    />
  );
}

export default FormFilterField;
