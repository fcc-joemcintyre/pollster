// @ts-check
import {
  QueryObserverResult, UseMutationResult, // eslint-disable-line no-unused-vars
  useMutation, useQuery,
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
export const useUpdateProfile = () => (
  useMutation ((/** @type Profile */ { name, theme }) => post ('/api/profile', { name, theme }))
);
