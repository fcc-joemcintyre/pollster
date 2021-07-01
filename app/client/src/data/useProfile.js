// @ts-check
import {
  QueryObserverResult, UseMutationResult, // eslint-disable-line no-unused-vars
  useMutation, useQuery, useQueryClient,
} from 'react-query';
import { get, post } from './api';

/**
  @typedef {object} Profile
  @property {string} name
  @property {string} theme
*/

/**
 * Get profile
 * @returns {QueryObserverResult<Profile, any>} query object
 */
export const useProfile = () => (
  useQuery ('profile', () => get ('/api/profile'))
);

/**
 * Update profile
 * @returns {UseMutationResult} mutation object
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient ();
  return useMutation ((/** @type Profile */ { name, theme }) => post ('/api/profile', { name, theme }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['profile']);
      },
    });
};
