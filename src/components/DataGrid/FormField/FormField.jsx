

import { Control } from 'react-hook-form';

import {
  FormDatePicker,
  FormRelatedSelect,
  FormRelatedListSelect,
  FormSelect,
  FormDateTimePicker,
  FormTextField,
} from './Inputs';


export function FormField({ name, control, schema, filter, ...props }) {
  if (!schema.type) {
    return null;
  }

  switch (schema.type) {
    case 'Boolean':
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
    case 'RelatedList':
      return <FormRelatedListSelect name={name} control={control} items={schema.values} {...props} />;
    case 'Related':
      return <FormRelatedSelect name={name} control={control} items={schema.values} filter={filter} {...props} />;
    case 'DateTime':
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
    case 'Date':
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
    case 'Integer':
    case 'Float':
      return <FormTextField name={name} control={control} {...props} />;
    default:
      return <FormTextField name={name} control={control} {...props} />;
  }
}
