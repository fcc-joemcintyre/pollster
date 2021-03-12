import { useEffect } from 'react';
import { PageContent, Text } from 'uikit';
import { useLogout } from '../../data/useAuth';

export const Logout = () => {
  const logout = useLogout ();

  useEffect (() => logout.mutate ({}), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContent>
      { logout.isLoading ? (
        <Text as='p' mt='30px' center>
          Logging out ...
        </Text>
      ) : logout.isError ? (
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
