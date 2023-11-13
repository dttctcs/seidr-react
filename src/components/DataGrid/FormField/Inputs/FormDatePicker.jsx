import { useController } from 'react-hook-form';
import { DateInput } from '@mantine/dates';

export function FormDatePicker({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });


  return (
    <>
      <DateInput
        onChange={(newValue) => {
          if (newValue instanceof Date) {
            const utcDate = new Date(newValue.getTime() - newValue.getTimezoneOffset() * 60000);
            field.onChange(utcDate.toISOString().substring(0, 10));
          }
        }}
        value={field.value ? new Date(field.value) : null}
        {...props}
      />
    </>
  );
}

