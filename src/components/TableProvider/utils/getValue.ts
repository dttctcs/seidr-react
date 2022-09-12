export const getValue = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((entryItem) => entryItem._name).join(', ');
  }

  if (typeof value === 'object') {
    return value._name;
  }

  return value;
};
