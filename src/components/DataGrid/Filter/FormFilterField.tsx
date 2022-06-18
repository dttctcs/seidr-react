import React from 'react';
import { useController } from 'react-hook-form';

import { TextField, Autocomplete } from '@mui/material';

function FormFilterField({ control, name, items, onChange, TextFieldProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => {
        const label = option
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(' ');

        return label;
      }}
      value={inputProps.value ? inputProps.value : null}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!error}
          {...TextFieldProps}
        />
      )}
      onChange={(event, newValue) => {
        if (newValue) {
          inputProps.onChange(newValue.value ?? newValue);
        }

        if (onChange) {
          if (newValue) {
            onChange(newValue.value ?? newValue);
          }
        }
      }}
      {...props}
    />
  );
}

export default FormFilterField;
