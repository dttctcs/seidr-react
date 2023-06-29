import { useController } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function FormDatePicker({ control, name, ...props }) {
  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        description={props.description}
        slotProps={{
          textField: {
            autoComplete: 'off',
            label: props.label,
            error: !!fieldState.error,
          },
        }}
        inputRef={field.ref}
        onChange={(newValue) => {
          if (newValue instanceof dayjs && !isNaN(newValue)) {
            return field.onChange(newValue.toISOString().substring(0, 10));
          }
        }}
        value={dayjs.utc(field.value)}
        {...props}
      />
    </LocalizationProvider>
  );
}
