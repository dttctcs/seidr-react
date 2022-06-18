import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function FormDatePickerField({ control, name, TextFieldProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(params) => <TextField {...params} error={!!error} {...TextFieldProps} />}
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

export default FormDatePickerField;
