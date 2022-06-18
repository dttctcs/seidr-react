import React from 'react';
import { useController } from 'react-hook-form';

import { TextField, Autocomplete } from '@mui/material';

function FormOperatorField({ control, name, items, onChange, TextFieldProps, ...props }) {
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
      value={inputProps.value ? inputProps.value : null}
      isOptionEqualToValue={(option, value) => option.value === value}
      getOptionLabel={(option) => {
        option = option.value ?? option;
        const elem = items.find((elem) => elem.value === option);
        return elem.label;
      }}
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
          inputProps.onChange(newValue.value);
        }

        if (onChange) {
          if (newValue) {
            onChange(newValue.value);
          }
        }
      }}
      {...props}
    />
  );
}

export default FormOperatorField;
