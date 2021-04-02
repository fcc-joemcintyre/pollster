// @ts-check
import { useState } from 'react';
import { Box, Divider, Pagination, Typography } from '@material-ui/core';
import { useAuth } from '../../data/useAuth';
import { usePolls } from '../../data/usePolls';
import { PageContent } from '../util';
import { PollList } from './PollList';

const perPage = 10;

export const Home = () => {
  const [page, setPage] = useState (1);
  const auth = useAuth ();
  const { data: polls, isLoading, isError } = usePolls (false, page - 1, perPage);

  function onChange (e, value) {
    setPage (value);
  }

  if (auth.isLoading || isLoading) {
    return (
      <PageContent>
        <span>Loading...</span>
      </PageContent>
    );
  }
  if (auth.isError || isError) {
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
          <Box m='40px auto 0 auto' maxWidth='600px'>
            <Typography paragraph>
              Welcome to Pollster, your place to vote and create new polls!
            </Typography>
            <Typography paragraph>
              To create your own polls, <i>Register</i> to create a free account
              and then <i>Login</i> anytime to manage your polls and see the results.
            </Typography>
          </Box>
          <Divider sx={{ margin: '20px 0 30px 0' }} />
        </>
      )}
      <Typography variant='h1' textAlign='center'>Active Polls</Typography>
      { !polls || polls.count === 0 ? (
        <Typography paragraph>
          There are no active polls - be the first to add a new one!
        </Typography>
      ) : (
        <>
          <PollList polls={polls.polls} />
          <Pagination
            count={Math.floor (Math.min ((polls.count + perPage - 1) / perPage, 10))}
            page={page}
            onChange={onChange}
          />
        </>
      )}
    </PageContent>
  );
};
