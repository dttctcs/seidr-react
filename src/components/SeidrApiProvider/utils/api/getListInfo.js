import { createFetchParams, urlJoin } from '../../../../utils';

export const getListInfo = async (path) => {
  try {
    const { fetchPath, options } = createFetchParams({ path: urlJoin(path, '_info'), method: 'GET' });

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
