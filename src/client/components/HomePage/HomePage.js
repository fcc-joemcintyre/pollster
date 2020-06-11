import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Divider, PageContent, Pagination, Text } from 'uikit';
import { Header } from '../Header';
import { LoginPage, RegisterPage } from '../User';
import { PollList } from './PollList';

export const HomePage = () => {
  const [first, setFirst] = useState (0);
  const [current, setCurrent] = useState (0);
  const history = useHistory ();
  const location = useLocation ();
  const authenticated = useSelector ((state) => state.user.authenticated);
  const polls = useSelector ((state) => state.polls);

  return (
    <Fragment>
      <Header />
      <PageContent>
        { !authenticated && (
          <Fragment>
            <Box mt='40px' center maxw='600px'>
              <Text as='p'>Welcome to Pollster, your place to vote and create new polls!</Text>
              <Text as='p'>
                To create your own polls, <i>Register</i> to create a free account
                and then <i>Login</i> anytime to manage your polls and see the results.
              </Text>
            </Box>
            <Divider mt='20px' mb='30px' />
          </Fragment>
        )}
        <Text as='h1' center>Active Polls</Text>
        { polls.length === 0 ? (
          <Text as='p'>There are no active polls - be the first to add a new one!</Text>
        ) : (
          <Fragment>
            <PollList polls={polls} current={current} pageItems={10} />
            <Pagination
              mt='12px'
              items={polls.length}
              pageItems={10}
              visible={10}
              first={first}
              current={current}
              onChange={(f, c) => {
                setFirst (f);
                setCurrent (c);
              }}
            />
          </Fragment>
        )}
        { location.search === '?login2' && (
          <LoginPage
            location={history.location}
            onCancel={() => history.push ('/')}
          />
        )}
        { location.search === '?register2' && (
          <RegisterPage
            history={history}
            onCancel={() => history.push ('/')}
          />
        )}
      </PageContent>
    </Fragment>
  );
};
