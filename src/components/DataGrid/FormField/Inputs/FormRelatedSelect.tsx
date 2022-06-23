import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, TextField } from '@mui/material';

export function FormRelatedSelect({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const currentItem = Object.values(items).find((item) => item.id === inputProps?.value?.id);
  return (
    <TextField
      select
      SelectProps={{
        value: currentItem?.value ?? '',
        onChange: (event, obj) => {
          for (let value of Object.values(items)) {
            if (value.value === obj.props.value) {
              inputProps.onChange(value);
            }
          }
        },
      }}
      ref={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...props}
      fullWidth
    >
      {items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.value}
        </MenuItem>
      ))}
    </TextField>
  );
}
