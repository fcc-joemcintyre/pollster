import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageContent } from '../style/Page';
import { Box } from '../style/Layout';
import { Heading, MinorHeading, P, SubHeading } from '../style/Text';
import PollItem from './PollItem.jsx';

class ResultPage extends Component {
  constructor (props) {
    super (props);
    this.polls = props.polls.filter ((poll) => { return poll.creator === props.username; });
    this.options = this.polls.map ((poll) => {
      return (
        <option key={poll._id} value={poll._id}>
          {poll.title}
        </option>
      );
    });

    this.state = {
      selected: (this.polls.length === 0) ? '' : this.polls[0]._id,
    };
  }

  render () {
    // if no polls for user, display message
    if (this.polls.length === 0) {
      return (
        <PageContent>
          <Heading center>Poll Results</Heading>
          <P center>You do not have any polls yet</P>
        </PageContent>
      );
    }

    const currentPoll = this.polls.find ((poll) => { return poll._id === this.state.selected; });
    const totalVotes = currentPoll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
    const choices = currentPoll.choices.map ((choice) => {
      const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
      return (
        <PollItem key={choice.text} text={choice.text} percent={percent} />
      );
    });

    return (
      <PageContent>
        <Heading center>Poll Results</Heading>
        <SelectSection>
          <SubHeading>My Polls</SubHeading>
          <select
            autoFocus
            value={this.state.selected}
            onChange={(e) => { this.setState ({ selected: e.target.value }); }}
          >
            {this.options}
          </select>
        </SelectSection>
        <ResultsSection>
          <SubHeading>Results</SubHeading>
          <Box pl='8px' pr='8px' pb='8px'>
            <MinorHeading>{currentPoll.title}</MinorHeading>
            <P center>Total Votes: {totalVotes}</P>
            {choices}
          </Box>
        </ResultsSection>
      </PageContent>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    username: state.user.username,
    polls: state.polls,
  });
};

export default connect (mapStateToProps) (ResultPage);

ResultPage.propTypes = {
  username: PropTypes.string.isRequired,
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

const SelectSection = styled.div`
  @media (max-width: 500px) {
    display: block;
    width: 100%;
    margin-bottom: 20px;

    > select {
      max-width: 300px;
    }
  }
  @media (min-width: 501px) {
    display: inline-block;
    vertical-align: top;
    margin-right: 20px;

    > select {
      max-width: 280px;
    }
  }
`;

const ResultsSection = styled.div`
  @media (max-width: 500px) {
    display: block;
    width: 100%;
  }
  @media (min-width: 501px) {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 300px);
  }
`;
