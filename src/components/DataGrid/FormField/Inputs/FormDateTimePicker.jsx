import { useController } from 'react-hook-form';
import { DateTimePicker } from '@mantine/dates';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function FormDateTimePicker({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <DateTimePicker
        valueFormat="DD MMM YYYY hh:mm A"
        maw={400}
        mx="auto"
      />
    </>
  );
}

/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
   </LocalizationProvider>*/