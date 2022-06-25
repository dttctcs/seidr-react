import { useState } from 'react';

import { createFetchParams } from './utils';

export function useProvideAuth(baseURL) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signin({ username, password }) {
    setIsLoading(true);
    try {
      const fetchParams = createFetchParams({
        base: baseURL,
        path: 'auth/login',
        method: 'POST',
        body: { username, password },
      });

      const response = await fetch(fetchParams.url.href, fetchParams.options);
      console.log(response);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setError({ error, message: "Coulnd't sign in" });
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError({ error, message: 'Failed to fetch' });
      setIsLoading(false);
    }
  }

  async function signout() {
    setIsLoading(true);
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/logout', method: 'Get' });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        setUser(null);
      } else {
        setError({ error, message: "Couldn't sign out" });
      }

      setIsLoading(false);
    } catch (error) {
      setError({ error, message: 'Failed to fetch' });
      setIsLoading(false);
    }
  }

  async function update(data) {
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/user', method: 'PUT', body: data });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setError({ error, message: "Couldn't update user data" });
      }
    } catch (error) {
      setError({ error, message: 'Failed to fetch' });
    }
  }

  async function resetPassword(data) {
    try {
      delete data.confirmPassword;
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/resetpassword', method: 'PUT', body: data });
      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (!response.ok) {
        setError({ error, message: "Couldn't reset password" });
      }
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  }

  return { user, error, isLoading, signin, signout, update, resetPassword };
}
