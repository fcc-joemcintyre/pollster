// @ts-check
import {
  QueryObserverResult, UseMutationResult, // eslint-disable-line no-unused-vars
  useMutation, useQuery, useQueryClient,
} from 'react-query';
import { get, post } from './api';

/**
 * @typedef {object} Register
 * @property {string} email
 * @property {string} name
 * @property {string} password
 */

/**
 * @typedef {object} Login
 * @property {string} email
 * @property {string} password
 */

/**
 * Get authentication status
 * @returns {QueryObserverResult} query object
 */
export const useAuth = () => (
  useQuery ('auth', () => get ('/api/verifylogin'), { staleTime: Infinity })
);

/**
 * Register
 * @returns {UseMutationResult} mutation object
 */
export const useRegister = () => (
  useMutation ((/** @type Register */ { email, name, password }) => (
    post ('/api/profile', { email, name, password })
  ))
);

/**
 * Login
 * @returns {UseMutationResult} mutation object
 */
export const useLogin = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    (/** @type Login */ { email, password }) => post ('/api/login', { email, password }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData ('auth', { key: data.key });
      },
    }
  );
};

/**
 * Logout
 * @returns {UseMutationResult} mutation object
 */
export const useLogout = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    () => post ('/api/logout', {}),
    {
      onSuccess: () => {
        queryClient.setQueryData ('auth', { key: 0 });
      },
    }
  );
};
