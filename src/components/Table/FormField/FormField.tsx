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
    return <FormRelatedSelect name={name} control={control} items={schema.values} {...props} />;
  }

  if (schema.type === 'DateTime') {
    return (
      <FormDateTimePicker
        control={control}
        name={name}
        mask="__.__.____ __:__"
        inputFormat="dd.MM.yyyy HH:mm"
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
        mask="__.__.____"
        inputFormat="dd.MM.yyyy"
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
