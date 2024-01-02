import { DateTimePicker } from '@mantine/dates';

export function FormDateTimePicker({ form, name, ...props }) {

  return (
    <>
      <DateTimePicker
        {...form.getInputProps(name)}
        onChange={(newValue) => {
          if (newValue instanceof Date) {
            const utcDate = new Date(newValue);
            form.setFieldValue(name, utcDate.toISOString());
          }
        }}
        value={form.getInputProps(name).value ? new Date(form.getInputProps(name).value) : null}
        {...props}
      />
    </>
  );
}
