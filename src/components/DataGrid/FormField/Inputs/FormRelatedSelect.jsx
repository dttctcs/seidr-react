import { Select } from '@mantine/core';

export function FormRelatedSelect({ form, name, items, filter, ...props }) {
  const data = items.map((item) => ({ value: item.id.toString(), label: item.value }));

  return (
    <Select
      data={data}
      searchable
      {...form.getInputProps(name)}
      onChange={(value) => {
        if (filter) {
          form.setFieldValue(name, value);
          return;
        }
        const newItem = items.find((item) => item.id.toString() === value);
        form.setFieldValue(name, newItem);
      }}
      value={filter ? form.getInputProps(name).value : String(form.getInputProps(name).value.id)}
      {...props}
    />
  );
}
