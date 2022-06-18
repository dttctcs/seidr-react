import React, { createContext, useContext, useEffect, useState } from 'react';
import { createFetchParams } from '../../utils';

const AuthContext = createContext();

// Hook for child components to get the auth object (and rerender when it changes)
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      signin({ username: '', password: '' });
    }
  }, [user]);

  async function signin({ username, password }) {
    setIsLoading(true);
    try {
      const fetchParams = createFetchParams({ path: 'auth/login', method: 'POST', body: { username, password } });

      const response = await fetch(fetchParams.url.href, fetchParams.options);

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setError({ error, message: "Coulnd't sign in" });
      }

      setIsLoading(false);
    } catch (error) {
      setError({ error, message: 'Failed to fetch' });
      setIsLoading(false);
    }
  }

  async function signout() {
    setIsLoading(true);
    try {
      const fetchParams = createFetchParams({ path: 'auth/logout', method: 'Get' });

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
      const fetchParams = createFetchParams({ path: 'auth/user', method: 'PUT', body: data });

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
      const fetchParams = createFetchParams({ path: 'auth/resetpassword', method: 'PUT', body: data });
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
