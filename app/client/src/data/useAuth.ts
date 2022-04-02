import {
  QueryObserverResult, useMutation, useQuery, useQueryClient,
} from 'react-query';
import { get, post } from './api';

export type AuthResponse = {
  key: number,
  theme: string,
};

type Register = {
  email: string,
  name: string,
  password: string,
};

type Login = {
  email: string,
  password: string,
};

/**
 * Get authentication status
 * @returns Query object
 */
export const useAuth = (): QueryObserverResult<AuthResponse> => (
  useQuery ('auth', () => get ('/api/verifylogin'), { staleTime: Infinity })
);

/**
 * Register
 * @returns Mutation object
 */
export const useRegister = () => (
  useMutation<void, Error, Register> (({ email, name, password }) => (
    post ('/api/register', { email, name, password })
  ))
);

/**
 * Login
 * @returns Mutation object
 */
export const useLogin = () => {
  const queryClient = useQueryClient ();
  return useMutation<AuthResponse, Error, Login> (
    ({ email, password }) => post ('/api/login', { email, password }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData ('auth', { key: data.key });
      },
    }
  );
};

/**
 * Logout
 * @returns Mutation object
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
