import { DateInput } from '@mantine/dates';

export function FormDatePicker({ form, name, ...props }) {

  return (
    <>
      <DateInput
        {...form.getInputProps(name)}
        onChange={(newValue) => {
          if (newValue instanceof Date) {
            const utcDate = new Date(newValue.getTime() - newValue.getTimezoneOffset() * 60000);
            form.setFieldValue(name, utcDate.toISOString().substring(0, 10));
          }
        }}
        value={form.getInputProps(name).value ? new Date(form.getInputProps(name).value) : null}
        {...props}
      />
    </>
  );
}

