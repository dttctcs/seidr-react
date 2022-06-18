import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, TextField } from '@mui/material';

function FormSelectField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      select
      SelectProps={{
        value: inputProps.value,
      }}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
      fullWidth
    >
      {items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default FormSelectField;
