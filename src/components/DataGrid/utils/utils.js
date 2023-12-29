export const getValue = (entry, column) => {
  const value = column.split('.').reduce((previous, current) => previous[current], entry);
  if (!value && typeof value !== 'boolean') {
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

export function dirtyValues(dirtyFields, allValues) {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    console.log(allValues)
    return allValues
  };
  // Here, we have an object
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])]),
  );
}

export function getJsonValue (item, columns)  {
  const JsonValue ={}
  columns.forEach((column) => {
    JsonValue[column.name] = 
      typeof item.result[column.name] == 'boolean' ? 
      String(item.result[column.name]) : item.result[column.name]
  })
  return JsonValue;
}
