import { useController } from 'react-hook-form';
import { DateTimePicker } from '@mantine/dates';

export function FormDateTimePicker({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <DateTimePicker
        withinPortal
        onChange={(newValue) => {
          if (newValue instanceof Date) {
            const utcDate = new Date(newValue);
            field.onChange(utcDate.toISOString());
          }
        }}
        value={field.value ? new Date(field.value) : null}
        {...props}
      />
    </>
  );
}


