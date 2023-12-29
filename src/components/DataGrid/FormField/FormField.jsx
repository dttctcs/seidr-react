import {
  FormDatePicker,
  FormRelatedSelect,
  FormRelatedListSelect,
  FormSelect,
  FormDateTimePicker,
  FormTextField,
} from './Inputs';


export function FormField({ form, name, control, schema, filter, ...props }) {
  if (!schema.type) {
    return null;
  }

  switch (schema.type) {
    case 'Boolean':
      return (
        <FormSelect
          form={form}
          name={name}
          items={[
            { label: 'true', value: 'true' },
            { label: 'false', value: 'false' },
          ]}
          {...props}
        />
      );
    case 'RelatedList':
      return <FormRelatedListSelect form={form} name={name} items={schema.values} {...props} />;
    case 'Related':
      return <FormRelatedSelect form={form} name={name} items={schema.values} filter={filter} {...props} />;
    case 'DateTime':
      return (
        <FormDateTimePicker
          form={form}
          name={name}
          format='DD.MM.YYYY HH:mm:ss'
          schema={schema}
          {...props}
        />
      );
    case 'Date':
      return (
        <FormDatePicker
          form={form}
          name={name}
          format='DD.MM.YYYY'
          schema={schema}
          {...props}
        />
      );
    case 'Integer':
    case 'Float':
      return <FormTextField form={form} name={name} {...props} />;
    default:
      return <FormTextField form={form} name={name} {...props} />;
  }
}
