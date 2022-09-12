import { createFetchParams, urlJoin } from '../../../utils';

export const deleteItem = async (path, id) => {
  try {
    const { fetchPath, options } = createFetchParams({ path: urlJoin(path, id.toString()), method: 'DELETE' });
    const response = await fetch(fetchPath, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error('Something went wrong.');
  } catch (error) {
    throw new Error(error);
  }
};
