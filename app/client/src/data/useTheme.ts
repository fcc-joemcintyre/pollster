import { useQuery } from 'react-query';
import { get } from './api';

/**
 * Get theme
 * @returns Query object
 */
export const useTheme = () => (
  useQuery ('theme', () => get ('/api/theme'), { staleTime: Infinity })
);
