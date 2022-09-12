import React from 'react';
import { useController } from 'react-hook-form';
import { DatePicker } from '@mantine/dates';

export function FormDatePicker({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <DatePicker
      label={props.label}
      placeholder="Pick date"
      inputFormat={'DD-MMM-YYYY'}
      value={inputProps.value}
      onChange={(newValue) => {
        inputProps.onChange(newValue.toISOString().split('T')[0]);
      }}
    />
  );
}
