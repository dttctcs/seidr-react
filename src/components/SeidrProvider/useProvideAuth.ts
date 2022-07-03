import { useState } from 'react';

import { createFetchParams } from './utils';

export function useProvideAuth(baseURL) {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const fetchParams = createFetchParams({
        base: baseURL,
        path: 'auth/user',
        method: 'GET',
      });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        const user = await response.json();
        return setUser(user);
      }
      Promise.reject({ message: "Coulnd't get user data" });
    } catch (error) {
      Promise.reject({ error, message: 'Failed to fetch' });
    }
  }

  async function signin({ username, password }) {
    try {
      const fetchParams = createFetchParams({
        base: baseURL,
        path: 'auth/login',
        method: 'POST',
        body: { username, password },
      });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        const user = await response.json();
        return setUser(user);
      }
      Promise.reject({ message: "Coulnd't sign in" });
    } catch (error) {
      Promise.reject({ error, message: 'Failed to fetch' });
    }
  }

  async function signout() {
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/logout', method: 'Get' });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        return setUser(null);
      }
      Promise.reject({ message: "Couldn't sign out" });
    } catch (error) {
      Promise.reject({ error, message: 'Failed to fetch' });
    }
  }

  async function update(data) {
    try {
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/user', method: 'PUT', body: data });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        const data = await response.json();
        return setUser(data);
      }
      Promise.reject({ message: "Couldn't update user data" });
    } catch (error) {
      Promise.reject({ error, message: 'Failed to fetch' });
    }
  }

  async function resetPassword(data) {
    try {
      delete data.confirmPassword;
      const fetchParams = createFetchParams({ base: baseURL, path: 'auth/resetpassword', method: 'PUT', body: data });
      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        return Promise.resolve({ message: 'Reset password' });
      }
      Promise.reject({ message: "Couldn't reset password" });
    } catch (error) {
      return Promise.reject('Failed to fetch');
    }
  }

  return { user, getUser, signin, signout, update, resetPassword };
}
