import React from 'react';
import { useController } from 'react-hook-form';

import { Select } from '@mantine/core';

function FormFilterField({ control, name, items, onChange, TextFieldProps, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      ref={ref}
      data={items}
      searchable
      // getOptionLabel={(option) => {
      //   const label = option
      //     .split('_')
      //     .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      //     .join(' ');

      //   return label;
      // }}
      onChange={(event, newValue) => {
        inputProps.onChange(newValue);

        if (onChange) {
          onChange(newValue.value ?? newValue);
        }
      }}
      {...inputProps}
      {...props}
    />
  );
}

export default FormFilterField;
