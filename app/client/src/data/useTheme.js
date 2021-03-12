// @ts-check
import {
  QueryObserverResult, // eslint-disable-line no-unused-vars
  useQuery,
} from 'react-query';
import { get } from './api';

/**
 * Get theme
 * @returns {QueryObserverResult} query object
 */
export const useTheme = () => (
  useQuery ('theme', () => get ('/api/theme'), { staleTime: Infinity })
);
