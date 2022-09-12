import { useEffect, useState } from 'react';
import { createFetchParams, urlJoin } from '../../utils';

export function useProvideInfo(baseUrl, auth) {
  const { user } = auth;
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '401 Not authorized', message: 'User is not logged in.' });

  useEffect(() => {
    if (user) {
      fetchInfo(baseUrl);
    }
  }, [user]);

  const fetchInfo = async (baseUrl) => {
    setLoading(true);
    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseUrl, 'info/'), method: 'GET' });

      const response = await fetch(fetchPath, options);
      if (response.ok) {
        const data = await response.json();
        setInfo(data);
      } else {
        setError({ error: '404 Not Found', message: "Couldn't fetch info." });
      }
    } catch (error) {
      setError({ error: 'Network error', message: 'Failed to fetch.' });
    } finally {
      setLoading(false);
    }
  };

  return { info, loading, error };
}
