import { createFetchParams, urlJoin } from '../../../../utils';

export let controller = null;

export const getList = async (path, queryParams) => {
  // if (controller) {
  //   controller.abort();
  // }
  controller = new AbortController();
  const signal = controller.signal;
  
  try {
    const { fetchPath, options } = createFetchParams({
      path: urlJoin(path, '/'),
      method: 'GET',
      //queryParams: { q: encodeURIComponent(JSON.stringify(queryParams)) },
      queryParams: { q: JSON.stringify(queryParams) },
    });
    const response = await fetch(fetchPath, {...options, signal});
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(response.statusText);
  } catch (error) {
    if(!error instanceof AbortSignal) throw new Error(error);
  }
};
