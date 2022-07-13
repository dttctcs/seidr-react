import { createFetchParams, urlJoin } from './utils';

export function useProvideApi(baseURL) {
  const fetchList = async (path, queryParams) => {
    try {
      const { fetchPath, options } = createFetchParams({
        path: urlJoin(baseURL, path, '/'),
        method: 'GET',
        queryParams: { q: JSON.stringify(queryParams) },
      });

      const response = await fetch(fetchPath, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return Promise.reject('Something went wrong.');
    } catch (error) {
      console.log(error);
      return Promise.reject('Failed to fetch');
    }
  };

  const fetchInfo = async (path) => {
    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, path, '_info'), method: 'GET' });

      const response = await fetch(fetchPath, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return Promise.reject('Something went wrong.');
    } catch (error) {
      console.log(error);
      return Promise.reject('Failed to fetch');
    }
  };

  const fetchEntry = async (path, id) => {
    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, path, id), method: 'GET' });
      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return Promise.reject('Something went wrong.');
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  };

  const createEntry = async (path, data) => {
    try {
      const { fetchPath, options } = createFetchParams({
        path: urlJoin(baseURL, path, '/'),
        method: 'POST',
        body: data,
      });
      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const data = await response.json();
        return Promise.resolve(data);
      }

      return Promise.resolve('Failed to fetch');
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  };

  const updateEntry = async (path, id, data) => {
    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, path, id), method: 'PUT', body: data });
      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const data = await response.json();
        return Promise.resolve(data);
      }

      return Promise.resolve('Failed to fetch');
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  };

  const deleteEntry = async (path, id) => {
    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, path, id), method: 'DELETE' });
      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const data = await response.json();
        return Promise.resolve(data);
      }

      return Promise.resolve('Failed to fetch');
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  };

  return { fetchList, fetchInfo, fetchEntry, createEntry, updateEntry, deleteEntry };
}
