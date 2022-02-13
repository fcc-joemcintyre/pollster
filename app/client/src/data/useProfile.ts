import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, post } from './api';

export type Profile = {
  name: string,
  theme: string,
};

/**
 * Get profile
 * @returns Query object
 */
export const useProfile = () => (
  useQuery<Profile> ('profile', () => get ('/api/profile'))
);

/**
 * Update profile
 * @returns Mutation object
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient ();
  return useMutation<void, Error, Profile> (({ name, theme }) => post ('/api/profile', { name, theme }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['profile']);
      },
    });
};
