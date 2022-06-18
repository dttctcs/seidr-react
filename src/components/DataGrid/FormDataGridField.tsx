import React from "react";

import FormTextField from "./Inputs/FormTextField";
import FormSelectField from "./Inputs/FormSelectField";
import FormRelatedSelectField from "./Inputs/FormRelatedSelectField";
import FormRelatedListSelectField from "./Inputs/FormRelatedListSelectField";
import FormDateTimePickerField from "./Inputs/FormDateTimePickerField";
import FormDatePickerField from "./Inputs/FormDatePickerField";

function FormDataGridField({ name, control, schema, ...props }) {
  if (!schema.type) {
    return null;
  }

  if (schema.type === "Boolean") {
    return (
      <FormSelectField
        name={name}
        control={control}
        items={[
          { label: "True", value: true },
          { label: "False", value: false },
        ]}
        {...props}
      />
    );
  }

  if (schema.type === "RelatedList") {
    return <FormRelatedListSelectField name={name} control={control} items={schema.values} {...props} />;
  }
  if (schema.type === "Related") {
    return <FormRelatedSelectField name={name} control={control} items={schema.values} {...props} />;
  }

  if (schema.type === "DateTime") {
    return (
      <FormDateTimePickerField
        control={control}
        name={name}
        TextFieldProps={{ fullWidth: true, ...props }}
        mask="__.__.____ __:__"
        inputFormat="dd.MM.yyyy HH:mm"
        ampm={false}
      />
    );
  }

  if (schema.type === "Date") {
    return (
      <FormDatePickerField
        control={control}
        name={name}
        TextFieldProps={{ fullWidth: true, ...props }}
        mask="__.__.____"
        inputFormat="dd.MM.yyyy"
        ampm={false}
      />
    );
  }

  if (schema.type === "Integer" || schema.type === "Float") {
    return (
      <FormTextField
        name={name}
        control={control}
        variant="outlined"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        fullWidth
        {...props}
      />
    );
  }

  return <FormTextField name={name} control={control} variant="outlined" fullWidth {...props} />;
}

export default FormDataGridField;
