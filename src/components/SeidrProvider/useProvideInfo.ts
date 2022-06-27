import { useEffect, useState } from 'react';
import { createFetchParams } from './utils';

export function useProvideInfo(baseURL, auth) {
  const { user } = auth;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (user) {
      fetchInfo(baseURL).then((data) => setInfo(data));
    }
  }, [user]);

  const fetchInfo = async (baseURL) => {
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'info/', method: 'GET' });

      const response = await fetch(fetchParams.url.href, fetchParams.options);
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return Promise.reject('Something went wrong.');
    } catch (error) {
      return Promise.reject('Failed to fetch seidr info');
    }
  };

  return info;
}
