import React from 'react';

import { Autocomplete } from '@mantine/core';

export function FormAutocomplete({ form, name, items, ...props }) {

  return <Autocomplete data={items} {...form.getInputProps(name)} {...props} />;
}
