// @ts-check
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { PageContent } from '../util';
import { useLogout } from '../../data/useAuth';

export const Logout = () => {
  const logout = useLogout ();

  useEffect (() => logout.mutate ({}), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContent>
      { logout.isLoading ? (
        <Typography mt='30px' textAlign='center'>
          Logging out ...
        </Typography>
      ) : logout.isError ? (
        <Typography mt='30px' textAlign='center'>
          Logging out did not complete, please retry or close your browser.
        </Typography>
      ) : (
        <Typography mt='30px' textAlign='center'>
          Thank you for using Pollster, we hope to see you back again soon.
        </Typography>
      )}
    </PageContent>
  );
};
