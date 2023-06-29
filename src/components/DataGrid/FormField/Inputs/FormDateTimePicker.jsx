import { useController } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function FormDateTimePicker({ control, name, ...props }) {
  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        ampm={false}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        slotProps={{
          popper: {},
          textField: {
            autoComplete: 'off',
            label: props.label,
            error: !!fieldState.error,
          },
        }}
        inputRef={field.ref}
        onChange={(newValue) => {
          if (newValue instanceof dayjs && !isNaN(newValue)) {
            return field.onChange(newValue.toISOString());
          }
          return field.onChange(null);
        }}
        value={dayjs.utc(field.value)}
        {...props}
      />
    </LocalizationProvider>
  );
}
