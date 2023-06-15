import { createFetchParams, urlJoin } from '../../../../utils';

export const getList = async (path, queryParams) => {
  try {
    const { fetchPath, options } = createFetchParams({
      path: urlJoin(path, '/'),
      method: 'GET',
      //queryParams: { q: encodeURIComponent(JSON.stringify(queryParams)) },
      queryParams: { q: JSON.stringify(queryParams) },
    });

    const response = await fetch(fetchPath, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(response.statusText);
  } catch (error) {
    throw new Error(error);
  }
};
