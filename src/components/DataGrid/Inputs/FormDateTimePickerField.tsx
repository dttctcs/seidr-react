import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function FormDateTimePickerField({ control, name, TextFieldProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(params) => <TextField {...params} {...TextFieldProps} />}
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

export default FormDateTimePickerField;
