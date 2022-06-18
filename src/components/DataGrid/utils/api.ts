import { createFetchParams } from '../../../utils';

export const fetchData = async (path, queryParams) => {
  try {
    const fetchParams = createFetchParams({ path: path, method: 'GET' });
    if (queryParams) {
      const query = JSON.stringify(queryParams);
      fetchParams.url.searchParams.append('q', query);
    }

    const response = await fetch(fetchParams.url.href, fetchParams.options);
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

export const fetchInfo = async (path) => {
  try {
    const fetchParams = createFetchParams({ path: path + '_info', method: 'GET' });

    const response = await fetch(fetchParams.url.href, fetchParams.options);
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

export const fetchEntry = async (path, id) => {
  try {
    const fetchParams = createFetchParams({ path: path + id, method: 'GET' });
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

export const createEntry = async (path, data) => {
  try {
    const fetchParams = createFetchParams({ path: path, method: 'POST', body: data });
    const response = await fetch(fetchParams.url.href, fetchParams.options);

    if (response.ok) {
      const data = await response.json();
      return Promise.resolve(data);
    }

    return Promise.resolve('Failed to fetch');
  } catch (error) {
    return Promise.reject('Failed to fetch');
  }
};

export const updateEntry = async (path, id, data) => {
  try {
    const fetchParams = createFetchParams({ path: path + id, method: 'PUT', body: data });
    const response = await fetch(fetchParams.url.href, fetchParams.options);

    if (response.ok) {
      const data = await response.json();
      return Promise.resolve(data);
    }

    return Promise.resolve('Failed to fetch');
  } catch (error) {
    return Promise.reject('Failed to fetch');
  }
};

export const deleteEntry = async (path, id) => {
  try {
    const fetchParams = createFetchParams({ path: path + id, method: 'DELETE' });
    const response = await fetch(fetchParams.url.href, fetchParams.options);

    if (response.ok) {
      const data = await response.json();
      return Promise.resolve(data);
    }

    return Promise.resolve('Failed to fetch');
  } catch (error) {
    return Promise.reject('Failed to fetch');
  }
};
