import { useController } from 'react-hook-form';
import { DatePicker } from '@mantine/dates';

export function FormDatePicker({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });


  return (
    <>
      <DatePicker
        withinPortal
       /* getDayProps={(date) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return {
              sx: (theme) => ({
                backgroundColor: theme.colors.red[theme.fn.primaryShade()],
                color: theme.white,
                ...theme.fn.hover({ backgroundColor: theme.colors.red[7] }),
              }),
            };
          }

          return {};
        }}*/
        onChange={(newValue) => {
          if (newValue instanceof Date) {
            const utcDate = new Date(newValue.getTime() - newValue.getTimezoneOffset() * 60000);
            field.onChange(utcDate.toISOString().substring(0, 10));
            {console.log(utcDate)}
          }
        }}
        value={field.value ? new Date(field.value) : null}
        {...props}
      />

    </>
  );
}

