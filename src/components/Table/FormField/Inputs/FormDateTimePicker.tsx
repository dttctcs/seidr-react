import React from 'react';
import { useController } from 'react-hook-form';

import { DateTimePicker } from './DatePicker';

export function FormDatePicker({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <DateTimePicker
      label={props.label}
      placeholder="Pick date time"
      inputFormat={'DD-MMM-YYYY hh:mm '}
      value={inputProps.value}
      onChange={(newValue) => {
        inputProps.onChange(newValue);
      }}
    />
  );
}
