import React from 'react';
import { FormValues } from '../types';

import { Control } from 'react-hook-form';

import {
  FormAutocomplete,
  FormDatePicker,
  FormRelatedSelect,
  FormRelatedListSelect,
  FormSelect,
  FormDateTimePicker,
  FormTextField,
} from './Inputs';

interface FormFieldProps {
  name: string;
  label: string;
  description: string;
  control: Control<FormValues>;
  schema: any;

  filter?: boolean;
}

export function FormField({ name, control, schema, filter, ...props }: FormFieldProps) {
  if (!schema.type) {
    return null;
  }

  if (schema.type === 'Boolean') {
    return (
      <FormSelect
        name={name}
        control={control}
        items={[
          { label: 'True', value: true },
          { label: 'False', value: false },
        ]}
        {...props}
      />
    );
  }

  if (schema.type === 'RelatedList') {
    return <FormRelatedListSelect name={name} control={control} items={schema.values} {...props} />;
  }
  if (schema.type === 'Related') {
    return <FormRelatedSelect name={name} control={control} items={schema.values} filter={filter} {...props} />;
  }

  if (schema.type === 'DateTime') {
    return (
      <FormDateTimePicker
        control={control}
        name={name}
        mask='__.__.____ __:__'
        format='dd.MM.yyyy HH:mm'
        schema={schema}
        PopperProps={filter && { placement: 'bottom-end' }}
        {...props}
      />
    );
  }

  if (schema.type === 'Date') {
    return (
      <FormDatePicker
        control={control}
        name={name}
        mask='__.__.____'
        format='dd.MM.yyyy'
        schema={schema}
        PopperProps={filter && { placement: 'bottom-end' }}
        {...props}
      />
    );
  }

  if (schema.type === 'Integer' || schema.type === 'Float') {
    return <FormTextField name={name} control={control} {...props} />;
  }

  return <FormTextField name={name} control={control} {...props} />;
}
