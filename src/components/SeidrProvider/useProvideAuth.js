import { useEffect, useReducer } from 'react';
import { createFetchParams, urlJoin } from '../../utils';


const initialState = { user: null, loading: true };

function reducer(state, action)  {
  switch (action.type) {
    case 'initCall':
      return { ...state, loading: true, error: null };
    case 'setUser':
      return { ...state, user: action.payload, loading: false, error: false };
    case 'setError':
      return { ...state, user: null, loading: false, error: action.payload };
    case 'setLoading':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function useProvideAuth(baseURL) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    authenticate();
  }, []);

  async function authenticate() {
    dispatch({ type: 'initCall' });

    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, 'auth/user'), method: 'GET' });

      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const user = await response.json();
        dispatch({ payload: user, type: 'setUser' });
        return user;
      }

      throw new Error(response.statusText);
    } catch (error) {
      dispatch({ payload: false, type: 'setLoading' });
    }
  }

  async function signin({ username, password }) {
    dispatch({ type: 'initCall' });

    try {
      const { fetchPath, options } = createFetchParams({
        path: urlJoin(baseURL, 'auth/login'),
        method: 'POST',
        body: { username, password },
      });

      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const user = await response.json();
        authenticate();
        dispatch({ payload: user, type: 'setUser' });
      } else {
        dispatch({ payload: 'Username or password wrong.', type: 'setError' });
      }
    } catch (error) {
      dispatch({ payload: 'Failed to fetch', type: 'setError' });
    }
  }

  async function signout() {
    dispatch({ type: 'initCall' });

    try {
      const { fetchPath, options } = createFetchParams({ path: urlJoin(baseURL, 'auth/logout'), method: 'Get' });

      const response = await fetch(fetchPath, options);

      if (response.ok) {
        dispatch({ payload: null, type: 'setUser' });
      } else {
        dispatch({ payload: "Couldn't sign out user", type: 'setError' });
      }
    } catch (error) {
      dispatch({ payload: 'Failed to fetch', type: 'setError' });
    }
  }

  async function update(data) {
    dispatch({ type: 'initCall' });

    try {
      const { fetchPath, options } = createFetchParams({
        path: urlJoin(baseURL, 'auth/user'),
        method: 'PUT',
        body: data,
      });

      const response = await fetch(fetchPath, options);

      if (response.ok) {
        const user = await response.json();
        dispatch({ payload: user, type: 'setUser' });
      }
      dispatch({ payload: "Couldn't update user data", type: 'setError' });
    } catch (error) {
      dispatch({ payload: 'Failed to post', type: 'setError' });
    }
  }

  async function resetPassword(password) {
    try {
      const { fetchPath, options } = createFetchParams({
        path: urlJoin(baseURL, 'auth/resetpassword'),
        method: 'PUT',
        body: { password },
      });
      const response = await fetch(fetchPath, options);

      if (response.ok) {
        dispatch({ payload: { ...state.user }, type: 'setUser' });
      } else {
        dispatch({ payload: "Couldn't reset password", type: 'setError' });
      }
    } catch (error) {
      dispatch({ payload: 'Failed to post', type: 'setError' });
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signin,
    signout,
    update,
    resetPassword,
  };
}
