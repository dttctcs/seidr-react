import * as yup from 'yup';

export const getValue = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((entryItem, index) => entryItem._name).join(', ');
  }

  if (typeof value === 'object') {
    return value._name;
  }

  return value;
};

export const getValidationSchema = (columns) => {
  const schema = columns.reduce((schema, column) => {
    let { name, required, type } = column;

    switch (type) {
      case 'RelatedList':
        type = 'array';
        break;
      case 'Related':
        type = 'object';
        break;
      case 'Date':
        type = 'date';
        break;
      case 'Integer':
      case 'Float':
        type = 'number';
        break;
      default:
        type = 'string';
    }

    let validator;

    try {
      if (required) {
        validator = yup[type]().typeError(`Field must be of type ${type}`).required('Field is required');
      } else {
        validator = yup[type]().typeError(`Field must be of type ${type}`).nullable(true);
      }
    } catch (error) {
      console.log(error);
    }
    schema[name] = validator;
    return schema;
  }, {});
  return yup.object().shape(schema);
};

export const getDefaultValues = (columns) => {
  const defaultValues = {};
  for (const item of columns) {
    switch (item.type) {
      case 'RelatedList':
        defaultValues[item.name] = [];
        break;
      case 'Related':
        defaultValues[item.name] = {};
        break;
      case 'Boolean':
        defaultValues[item.name] = 'false';
        break;
      case 'Date':
      case 'DateTime':
        defaultValues[item.name] = null;
        break;
      case 'Integer':
      case 'Float':
        defaultValues[item.name] = null;
        break;

      default:
        defaultValues[item.name] = '';
    }
  }
  return defaultValues;
};
