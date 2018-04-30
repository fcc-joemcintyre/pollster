import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageContent, Box } from '../../lib/Layout';
import { Divider } from '../../lib/Divider';
import { H1, P } from '../../lib/Text';
import { PollList } from './PollList';

const HomePageBase = ({ authenticated, polls }) => (
  <PageContent>
    {
      (authenticated === false) &&
      <Fragment>
        <Box center maxw='600px'>
          <P>Welcome to Pollster, your place to vote and create new polls!</P>
          <P>
            To create your own polls, <i>Register</i> to create a free account
            and then <i>Login</i> anytime to manage your polls and see the results.
          </P>
        </Box>
        <Divider mt='20px' mb='30px' />
      </Fragment>
    }
    <H1 center>Active Polls</H1>
    {
      (polls.length === 0) ?
        <P>There are no active polls - be the first to add a new one!</P> :
        <PollList polls={polls} />
    }
  </PageContent>
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  polls: state.polls,
});

export const HomePage = connect (mapStateToProps) (HomePageBase);

HomePageBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
