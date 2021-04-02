// @ts-check
import {
  QueryObserverResult, UseMutationResult, // eslint-disable-line no-unused-vars
  useMutation, useQuery, useQueryClient,
} from 'react-query';
import { get, post, remove } from './api';

/**
  @typedef { import ('../types/types').Poll} Poll
  @typedef { import ('../types/types').PollResponse} PollResponse

  @typedef {object} PollKey
  @property {number} key

  @typedef {object} PollVote
  @property {number} key
  @property {string} choice
*/

/**
 * Get polls
 * @param {boolean} own Own polls (true) or all polls (false)
 * @param {number} page Pagination page
 * @param {number} limit Pagination items per page
 * @returns {QueryObserverResult<PollResponse, any>} query object
 */
export const usePolls = (own = false, page = 0, limit = 100) => (
  useQuery (
    ['polls', { own, page, limit }],
    () => get (`/api/polls?own=${own}&page=${page}&limit=${limit}`)
  )
);

/**
 * Get poll
 * @param {number} key Poll key
 * @returns {QueryObserverResult<Poll, any>} query object
 */
export const usePoll = (key) => (
  useQuery (['polls', { key }], () => get (`/api/polls/${key}`), {
    retry: (count, error) => (error.status === 404 ? false : count < 3),
  })
);

/**
 * Create a new poll
 * @returns {UseMutationResult} mutation object
 */
export const useCreatePoll = () => {
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
    (/** @type PollVote */ { key, choice }) => post (`/api/polls/${key}/votes/${choice}`, {}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};
