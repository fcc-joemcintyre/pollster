import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageContent, Text } from 'uikit';
import { logout } from '../../store/userActions';

export const Logout = () => {
  const [working, setWorking] = useState (true);
  const dispatch = useDispatch ();
  const authenticated = useSelector ((state) => state.user.authenticated);

  useEffect (() => {
    (async () => {
      await dispatch (logout ());
      setWorking (false);
    }) ();
  }, [dispatch]);

  return (
    <PageContent>
      {working ? (
        <Text as='p' mt='30px' center>
          Logging out ...
        </Text>
      ) : authenticated ? (
        <Text as='p' mt='30px' center>
          Logging out did not complete, please retry or close your browser.
        </Text>
      ) : (
        <Text as='p' mt='30px' center>
          Thank you for using Pollster, we hope to see you back again soon.
        </Text>
      )}
    </PageContent>
  );
};
