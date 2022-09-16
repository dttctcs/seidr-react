export function createQueryParams(currentQueryParams, partialQueryParams) {
  const newQueryParams = currentQueryParams || {
    columns: [],
    filters: [],
    // keys: [],

    page: 0,
    page_size: 25,
  };

  if (partialQueryParams.hasOwnProperty('columns')) {
    newQueryParams.columns = partialQueryParams.columns;
  }
  if (partialQueryParams.hasOwnProperty('filters')) {
    newQueryParams.filters = partialQueryParams.filters;
  }
  if (partialQueryParams.hasOwnProperty('order_column')) {
    newQueryParams.order_column = partialQueryParams.order_column;
  }
  if (partialQueryParams.hasOwnProperty('order_direction')) {
    newQueryParams.order_direction = partialQueryParams.order_direction;
  }
  if (partialQueryParams.hasOwnProperty('page')) {
    newQueryParams.page = partialQueryParams.page;
  }
  if (partialQueryParams.hasOwnProperty('page_size')) {
    newQueryParams.page_size = partialQueryParams.page_size;
  }

  return newQueryParams;
}
