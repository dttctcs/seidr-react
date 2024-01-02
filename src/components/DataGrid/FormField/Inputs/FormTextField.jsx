
import { TextInput, PasswordInput } from '@mantine/core';

export function FormTextField({ form, name, ...props }) {
  return name === "password" ? <PasswordInput {...form.getInputProps(name)} {...props} />:
  <TextInput {...form.getInputProps(name)} {...props} />;
}
