import * as yup from 'yup';

export const getValidationSchema = (columns) => {
  const schema = columns.reduce((schema, column) => {
    // eslint-disable-next-line prefer-const
    let { name, required, type } = column;

    switch (type) {
      case 'RelatedList':
        type = 'array';
        break;
      case 'Related':
        type = 'object';
        break;
      case 'Date':
        type = 'string';
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
