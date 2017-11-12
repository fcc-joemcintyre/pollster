import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { vote } from '../../store/pollsActions';

class PollPage extends Component {
  constructor (props) {
    super (props);
    const _id = this.props.match.params._id;
    const poll = props.polls.find ((p) => { return (p._id === _id); });
    this.state = {
      poll,
      selected: -1,
      voted: false,
      transition: false,
    };
    this.handleVote = this.handleVote.bind (this);
  }

  async handleVote () {
    if (this.state.selected !== -1) {
      const poll = Object.assign ({}, this.state.poll);
      const choice = poll.choices[this.state.selected];
      choice.votes += 1;
      this.setState (() => { return { voted: true, poll }; });
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
        <form
          className='app-page-content'
          onSubmit={(e) => {
            e.preventDefault ();
            this.props.history.push ('/');
          }}
        >
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p>Sorry, could not find that poll for you.</p>
            <button className='app-form-button' autoFocus>
              Back to Polls
            </button>
          </div>
        </form>
      );
    }
    const totalVotes = this.state.poll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
    const rows = [];
    for (let i = 0; i < this.state.poll.choices.length; i ++) {
      const choice = this.state.poll.choices[i];
      const key = `p-r-${i}`;
      if (this.state.voted) {
        let text = (i === this.state.selected) ? '\u2713 ' : '';
        text += choice.text;
        let percent = 0;
        if (totalVotes > 0) {
          percent = Math.floor ((choice.votes / totalVotes) * 100);
        }
        rows.push (
          <div key={key} className='app-poll-votedItemArea'>
            <div
              className='app-poll-votedItemBar'
              style={{ width: `${this.state.transition ? percent : 0}%` }}
            />
            <span className='app-poll-votedItemName'>{text}</span>
            <span className='app-poll-votedItemPercent'>{percent}%</span>
          </div>
        );
      } else {
        const pollClassName = (i === this.state.selected) ?
          'app-poll-pollItem app-poll-pollItemSelected' : 'app-poll-pollItem';
        const check = (i === this.state.selected) ?
          <span className='app-poll-pollItemName'>&#10003; </span> : null;
        const text = <span className='app-poll-pollItemName'>{choice.text}</span>;
        rows.push (
          <div
            key={key}
            className={`${pollClassName} ${(i % 2 === 0) ? 'app-poll-pollItemEven' : 'app-poll-pollItemOdd'}`}
            onClick={() => { this.setState ({ selected: i }); }}
          >
            {check}{text}
          </div>
        );
      }
    }

    // on initial display of results, initiate CSS transition
    if (this.state.voted && (this.state.transition === false)) {
      setTimeout (() => {
        this.setState ({ transition: true });
      }, 100);
    }

    const buttons = [];
    if (this.state.voted === false) {
      buttons.push (
        <button
          key='button1'
          className='app-form-button'
          disabled={(this.state.selected === -1)}
          onClick={this.handleVote}
        >
          Vote
        </button>
      );
    }
    buttons.push (
      <button
        key='button2'
        className='app-form-button'
        onClick={() => { this.props.history.push ('/'); }}
      >
        Back to Polls
      </button>
    );

    return (
      <div className='app-page-content'>
        <h1>{this.state.poll.title}</h1>
        <div className='app-poll-items'>
          {rows}
        </div>
        {
          this.state.voted ? null :
          <p className='app-poll-hint'>
            Select your favorite, the poll results will be shown after you vote.
          </p>
        }
        <div className='app-form-buttonArea'>
          {buttons}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    polls: state.polls,
  });
};

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
