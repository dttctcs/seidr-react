/*import { useController } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);*/

import { useController } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DatePicker } from '@mantine/dates';



dayjs.extend(utc)

export function FormDatePicker({ control, name, ...props }) {
  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
  });

  // const asUTC = new Date(data.getTime() - data.getTimezoneOffset() * 60000)

  return (


      <>
      <DatePicker
        withinPortal
       // inputFormat="YYYY-MM-DD"

        /* defaultDate={new Date(2021, 7)}
       getDayProps={(date) => {
          if (date.getDay() === 5 && date.getDate() === 13) {
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



        description={props.description}
        onChange={(newValue) => {
          if (newValue instanceof dayjs && !isNaN(newValue)) {
            return field.onChange(newValue.toISOString().substring(0, 10));
          }
        }}
        value={field.value}

        inputRef={field.ref}
        {...props}
      />

      </>


  /*   <LocalizationProvider dateAdapter={AdapterDayjs}>
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
     </LocalizationProvider>*/
  );
}
