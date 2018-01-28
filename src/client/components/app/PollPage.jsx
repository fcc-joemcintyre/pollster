import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { vote } from '../../store/pollsActions';
import { PageContent } from '../style/Page';
import { Row } from '../style/Layout';
import { Heading, P } from '../style/Text';
import { Button } from '../style/Button';
import PollItem from './PollItem.jsx';

class PollPage extends Component {
  constructor (props) {
    super (props);
    const _id = this.props.match.params._id;
    const poll = props.polls.find (p => (p._id === _id));
    this.state = {
      poll,
      selected: -1,
      voted: false,
    };
    this.handleVote = this.handleVote.bind (this);
  }

  async handleVote () {
    if (this.state.selected !== -1) {
      const poll = Object.assign ({}, this.state.poll);
      const choice = poll.choices[this.state.selected];
      choice.votes += 1;
      this.setState (() => ({ voted: true, poll }));
      try {
        await this.props.dispatch (vote (this.state.poll._id, choice.text));
      } catch (err) {
        // no op
      }
    }
  }

  render () {
    if (! this.state.poll) {
      return (
        <PageContent>
          <form
            onSubmit={(e) => {
              e.preventDefault ();
              this.props.history.push ('/');
            }}
          >
            <P center mt='40px'>Sorry, could not find that poll for you.</P>
            <Row center>
              <Button center mt='16px' autoFocus>Back to Polls</Button>
            </Row>
          </form>
        </PageContent>
      );
    }
    const totalVotes = this.state.poll.choices.reduce ((a, b) => a + b.votes, 0);
    const rows = this.state.poll.choices.map ((choice, index) => {
      const text = (index === this.state.selected) ? `\u2713 ${choice.text}` : choice.text;
      let percent = 0;
      if (this.state.voted) {
        if (totalVotes > 0) {
          percent = Math.floor ((choice.votes / totalVotes) * 100);
        }
        return <PollItem key={text} text={text} percent={percent} selected={false} />;
      } else {
        return (
          <PollItem
            key={text}
            text={text}
            percent={percent}
            selected={this.state.selected !== -1}
            onClick={() => { this.setState ({ selected: index }); }}
          />
        );
      }
    });

    return (
      <PageContent>
        <Heading center>{this.state.poll.title}</Heading>
        <Row mt='20px'>
          {rows}
        </Row>
        {
          this.state.voted ? null :
          <P center mt='20px'>
            Select your favorite, the poll results will be shown after you vote.
          </P>
        }
        <Row center mt='20px'>
          {(this.state.voted === false) &&
            <Button
              disabled={(this.state.selected === -1)}
              onClick={this.handleVote}
            >
              Vote
            </Button>
          }
          <Button onClick={() => { this.props.history.push ('/'); }}>
            Back to Polls
          </Button>
        </Row>
      </PageContent>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls,
});

export default connect (mapStateToProps) (PollPage);

PollPage.propTypes = {
  polls: PropTypes.arrayOf (PropTypes.shape ()).isRequired,
  match: PropTypes.shape ({
    params: PropTypes.shape ({
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape ({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
