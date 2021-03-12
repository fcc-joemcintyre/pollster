// @ts-check
import {
  QueryObserverResult, UseMutationResult, // eslint-disable-line no-unused-vars
  useMutation, useQuery, useQueryClient,
} from 'react-query';
import { get, post, remove } from './api';

/**
 * @typedef {object} Choice
 * @property {string} text
 * @property {number} votes
 */
/**
 * @typedef {object} Poll
 * @property {number} key
 * @property {string} title
 * @property {Choice[]} choices
 */
/**
 * @typedef {object} PollKey
 * @property {number} key
*/
/**
 * @typedef {object} PollVote
 * @property {number} key
 * @property {string} choice
*/

/**
 * Get polls
 * @returns {QueryObserverResult} query object
 */
export const usePolls = () => (
  useQuery ('polls', () => get ('/api/polls'))
);

/**
 * Get polls for current user
 * @returns {QueryObserverResult} query object
 */
export const usePollsOwn = () => (
  useQuery ('pollsOwn', () => get ('/api/polls?own'))
);

/**
 * Get poll
 * @param {number} key Poll key
 * @returns {QueryObserverResult} query object
 */
export const usePoll = (key) => (
  useQuery (['polls', { key }], () => get (`/api/polls/${key}`))
);

/**
 * Add a poll
 * @returns {UseMutationResult} mutation object
 */
export const useAddPoll = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    (/** @type Poll */ { title, choices }) => post ('/api/polls', { title, choices }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};

/**
 * Update a poll
 * @returns {UseMutationResult} mutation object
 */
export const useUpdatePoll = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    (/** @type Poll */ { key, title, choices }) => post (`/api/polls/${key}`, { title, choices }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};

/**
 * Delete a poll
 * @returns {UseMutationResult} mutation object
 */
export const useDeletePoll = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    (/** @type PollKey */ { key }) => remove (`/api/polls/${key}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};

/**
 * Vote in a poll
 * @returns {UseMutationResult} mutation object
 */
export const useVote = () => {
  const queryClient = useQueryClient ();
  return useMutation (
    (/** @type PollVote */ { key, choice }) => post (`/api/polls/${key}/votes/${choice}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};
