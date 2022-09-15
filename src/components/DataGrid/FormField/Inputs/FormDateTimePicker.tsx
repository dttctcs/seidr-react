import React, { useRef } from 'react';
import { useController } from 'react-hook-form';

import { TextInput, useMantineTheme } from '@mantine/core';
import { Calendar } from 'tabler-icons-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export function FormDateTimePicker({ control, name, PopperProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const theme = useMantineTheme();
  // const [refState, setRefState] = useState(refState);
  const customInputRef = useRef();

  // useEffect(() => {
  //   if (customInputRef) {
  //     setRefState(!refState);
  //   }
  // }, [customInputRef.current]);

  const colors = theme.fn.variant({
    variant: 'default',
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        components={{
          OpenPickerIcon: Calendar,
        }}
        OpenPickerButtonProps={{
          sx: {
            padding: 0,
            marginLeft: '-18px',
            color: theme.colors.gray[7],
          },
        }}
        PopperProps={{
          anchorEl: customInputRef.current,
          sx: {
            '& .Mui-selected': {
              backgroundColor: `${colors.background} !important`,
              ...theme.fn.hover({
                backgroundColor: `${colors.hover} !important`,
              }),
            },
          },
          ...PopperProps,
        }}
        renderInput={({ ref, inputProps, disabled, onChange, value, ...other }) => {
          return (
            <TextInput
              ref={customInputRef}
              label={props.label}
              error={!!error}
              rightSection={other.InputProps.endAdornment}
              {...inputProps}
            />
          );
        }}
        inputRef={ref}
        {...inputProps}
        onChange={(newValue) => {
          inputProps.onChange(newValue);
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}