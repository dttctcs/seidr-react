import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, TextField, Chip } from '@mui/material';

function FormRelatedListSelectField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  inputProps.value = items.filter((item) => {
    for (const inputValue of inputProps.value) {
      if (item.id === inputValue.id) {
        return true;
      }
    }
    return false;
  });

  return (
    <TextField
      select
      SelectProps={{
        sx: { '&:focus': { borderRadius: (theme) => theme.shape.borderRadius } },
        multiple: true,
        value: inputProps.value,
        MenuProps: {
          sx: { maxHeight: (theme) => theme.spacing(53) },
        },
        renderValue: (selected) => {
          return selected.map((item, _) => {
            return <Chip key={item.id} sx={{ margin: '0 2px' }} label={item.value} />;
          });
        },
      }}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox color="primary" checked={inputProps.value.indexOf(item) > -1} />
            <ListItemText primary={item.value} />
          </MenuItem>
        ))
      ) : (
        <MenuItem value="" disabled>
          <em>Keine {props.group} vorhanden.</em>
        </MenuItem>
      )}
    </TextField>
  );
}

export default FormRelatedListSelectField;
