import { useState } from 'react';
import { Box, Divider, PageContent, Pagination, Text } from 'uikit';
import { useAuth } from '../../data/useAuth';
import { usePolls } from '../../data/usePolls';
import { PollList } from './PollList';

export const Home = () => {
  const [first, setFirst] = useState (0);
  const [current, setCurrent] = useState (0);
  const auth = useAuth ();
  const polls = usePolls ();

  if (auth.isLoading || polls.isLoading) {
    return (
      <PageContent>
        <span>Loading...</span>
      </PageContent>
    );
  }
  if (auth.isError || polls.isError) {
    return (
      <PageContent>
        <span>Error loading page...</span>
      </PageContent>
    );
  }

  const authenticated = auth.isSuccess && auth.data.key > 0;

  return (
    <PageContent>
      { !authenticated && (
        <>
          <Box mt='40px' center maxw='600px'>
            <Text as='p'>Welcome to Pollster, your place to vote and create new polls!</Text>
            <Text as='p'>
              To create your own polls, <i>Register</i> to create a free account
              and then <i>Login</i> anytime to manage your polls and see the results.
            </Text>
          </Box>
          <Divider mt='20px' mb='30px' />
        </>
      )}
      <Text as='h1' center>Active Polls</Text>
      { polls.data.length === 0 ? (
        <Text as='p'>There are no active polls - be the first to add a new one!</Text>
      ) : (
        <>
          <PollList polls={polls.data} current={current} pageItems={10} />
          <Pagination
            mt='12px'
            items={polls.data.length}
            pageItems={10}
            visible={10}
            first={first}
            current={current}
            onChange={(f, c) => {
              setFirst (f);
              setCurrent (c);
            }}
          />
        </>
      )}
    </PageContent>
  );
};
