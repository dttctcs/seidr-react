import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';

function FormTextField({ control, name, disableError, helperText, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      inputRef={ref}
      {...inputProps}
      error={!!error}
      helperText={error && !disableError ? error.message : helperText ? helperText : null}
      {...props}
    />
  );
}

export default FormTextField;
