import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, post, remove } from './api';

export type Poll = {
  key: number,
  creator: number,
  title: string,
  choices: PollChoice[],
};

export type PollChoice = {
  text: string,
  votes: number,
};

export type PollResponse = {
  count: number,
  polls: Poll[],
};

type PollVote = {
  key: number,
  choice: string,
};

/**
 * Get polls
 * @param own Own polls (true) or all polls (false)
 * @param age Pagination page
 * @param limit Pagination items per page
 * @returns Query object
 */
export const usePolls = (own = false, page = 0, limit = 100) => (
  useQuery<PollResponse> (
    ['polls', { own, page, limit }],
    () => get (`/api/polls?own=${own}&page=${page}&limit=${limit}`)
  )
);

/**
 * Get poll
 * @param key Poll key
 * @returns Query object
 */
export const usePoll = (key: number) => (
  useQuery<Poll, { status: number }> (['polls', { key }], () => get (`/api/polls/${key}`), {
    retry: (count, error) => (error.status === 404 ? false : count < 3),
  })
);

/**
 * Create a new poll
 * @returns Mutation object
 */
export const useCreatePoll = () => {
  const queryClient = useQueryClient ();
  return useMutation<void, Error, { title: string, choices: string[] }> (
    ({ title, choices }) => post ('/api/polls', { title, choices }),
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
 * @returns Mutation object
 */
export const useUpdatePoll = () => {
  const queryClient = useQueryClient ();
  return useMutation<void, Error, { key: number, title: string, choices: string[] }> (
    ({ key, title, choices }) => post (`/api/polls/${key}`, { title, choices }),
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
 * @returns Mutation object
 */
export const useDeletePoll = () => {
  const queryClient = useQueryClient ();
  return useMutation<void, Error, { key: number }> (
    ({ key }) => remove (`/api/polls/${key}`),
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
 * @returns Mutation object
 */
export const useVote = () => {
  const queryClient = useQueryClient ();
  return useMutation<void, Error, PollVote> (
    ({ key, choice }) => post (`/api/polls/${key}/votes/${choice}`, {}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries (['polls']);
        queryClient.invalidateQueries (['pollsOwn']);
      },
    }
  );
};
