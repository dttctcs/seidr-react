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
