import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageContent } from '../style/Page';
import { Box, Divider } from '../style/Layout';
import { Heading, P } from '../style/Text';
import PollList from './PollList.jsx';

const HomePage = ({ authenticated, polls }) => (
  <PageContent>
    {
      (authenticated === false) &&
      <Fragment>
        <Box center noborder>
          <P>Welcome to Pollster, your place to vote and create new polls!</P>
          <P>
            To create your own polls, <i>Register</i> to create a free account
            and then <i>Login</i> anytime to manage your polls and see the results.
          </P>
        </Box>
        <Divider mt='16px' />
      </Fragment>
    }
    <Heading center>Active Polls</Heading>
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

export default connect (mapStateToProps) (HomePage);

HomePage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
