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
          format='DD.MM.YYYY HH:mm:ss'
          schema={schema}
          {...props}
        />
      );
    case 'Date':
      return (
        <FormDatePicker
          control={control}
          name={name}
          format='DD.MM.YYYY'
          schema={schema}
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
