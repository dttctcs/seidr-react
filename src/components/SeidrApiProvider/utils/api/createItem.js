import { createFetchParams, urlJoin } from '../../../../utils';

export const createItem = async (path, data) => {
  try {
    const { fetchPath, options } = createFetchParams({
      path: urlJoin(path, '/'),
      method: 'POST',
      body: data,
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
