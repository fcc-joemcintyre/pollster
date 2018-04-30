import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageContent, Box, Flex, FlexItem } from '../../lib/Layout';
import { H1, H6, P, H2 } from '../../lib/Text';
import { Select } from '../../lib/Select';
import { PollItem } from '../PollPage';

class ResultPageBase extends Component {
  constructor (props) {
    super (props);
    this.polls = props.polls.filter (poll => (poll.creator === props.username));
    this.options = this.polls.map (poll => (
      <option key={poll._id} value={poll._id}>
        {poll.title}
      </option>
    ));

    this.state = {
      selected: (this.polls.length === 0) ? '' : this.polls[0]._id,
    };
  }

  render () {
    // if no polls for user, display message
    if (this.polls.length === 0) {
      return (
        <PageContent>
          <H1 center>Poll Results</H1>
          <P center>You do not have any polls yet</P>
        </PageContent>
      );
    }

    const currentPoll = this.polls.find (poll => (poll._id === this.state.selected));
    const totalVotes = currentPoll.choices.reduce ((a, b) => a + b.votes, 0);
    const choices = currentPoll.choices.map ((choice) => {
      const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
      return (
        <PollItem key={choice.text} text={choice.text} percent={percent} />
      );
    });

    return (
      <PageContent>
        <H1 center>Poll Results</H1>
        <Flex wraps p='0 4px 16px 4px'>
          <FlexItem size='280px' mr='20px'>
            <H2>My Polls</H2>
            <Select
              autoFocus
              value={this.state.selected}
              onChange={(e) => { this.setState ({ selected: e.target.value }); }}
            >
              {this.options}
            </Select>
          </FlexItem>
          <FlexItem shrink grow style={{ minWidth: '288px' }}>
            <H2>Results</H2>
            <Box>
              <H6 center>{currentPoll.title}</H6>
              <P center>Total Votes: {totalVotes}</P>
              {choices}
            </Box>
          </FlexItem>
        </Flex>
      </PageContent>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  polls: state.polls,
});

export const ResultPage = connect (mapStateToProps) (ResultPageBase);

ResultPageBase.propTypes = {
  username: PropTypes.string.isRequired,
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
