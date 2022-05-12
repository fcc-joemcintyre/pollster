import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import { PageContent } from '../util';
import { useLogout } from '../../data/useAuth';

export const Logout = () => {
  const navigate = useNavigate ();
  const logout = useLogout ();

  useEffect (() => logout.mutate (), []); // eslint-disable-line react-hooks/exhaustive-deps

  const onHome = useCallback (() => navigate ('/'), [navigate]);

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
        <Box mt='30px' textAlign='center'>
          <Typography paragraph>
            Thank you for using Pollster, we hope to see you back again soon.
          </Typography>
          <Button
            type='button'
            onClick={onHome}
          >
            Home
          </Button>
        </Box>
      )}
    </PageContent>
  );
};
