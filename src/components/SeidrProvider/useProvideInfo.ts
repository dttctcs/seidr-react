import { createFetchParams } from './utils';

export function useProvideInfo(baseURL) {
  const fetchInfo = async () => {
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'info', method: 'GET' });
      console.log(fetchParams.url);
      const response = await fetch(fetchParams.url.href, fetchParams.options);
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return Promise.reject('Something went wrong.');
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  };

  return fetchInfo;
}
