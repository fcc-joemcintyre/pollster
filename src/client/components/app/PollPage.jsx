import React from 'react';
import { withRouter } from 'react-router';
import { getPoll } from '../../store/polls';
import { vote } from '../../store/pollsActions';

class PollPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let _id = this.props.params._id;
    const poll = getPoll (context.store.getState (), _id);
    if (poll === null) {
      _id = -1;
    }
    this.state = {
      _id,
      poll,
      selected: -1,
      voted: false,
      transition: false,
    };
    this.handleVote = this.handleVote.bind (this);
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      const poll = getPoll (this.context.store.getState (), this.state._id);
      if (this.state.poll !== poll) {
        this.setState ({ poll });
      }
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  handleVote () {
    if (this.state.selected !== -1) {
      const poll = Object.assign ({}, this.state.poll);
      const choice = poll.choices[this.state.selected];
      choice.votes += 1;
      this.setState ({ voted: true, poll });
      this.context.store.dispatch (vote (this.state.poll._id, choice.text));
    }
  }

  render () {
    if (this.state.poll === null) {
      return (
        <form className='messageForm' onSubmit={() => { this.props.router.push ('/'); }}>
          <p>Sorry, could not find that poll for you.</p>
          <button type='submit'>Back to Polls</button>
        </form>
      );
    }
    const totalVotes = this.state.poll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
    const rows = [];
    for (let i = 0; i < this.state.poll.choices.length; i ++) {
      const key = `p-r-${i}`;
      if (this.state.voted) {
        let text = (i === this.state.selected) ? '\u2713 ' : '';
        text += this.state.poll.choices[i].text;
        let percent = 0;
        if (totalVotes > 0) {
          percent = Math.floor ((this.state.poll.choices[i].votes / totalVotes) * 100);
        }
        rows.push (
          <div key={key} className='app-poll-votedItemArea'>
            <div
              className='app-poll-votedItemBar'
              style={{
                width: `${this.state.transition ? percent : 0}%`,
              }}
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
        const choice = <span className='app-poll-pollItemName'>{this.state.poll.choices[i].text}</span>;
        rows.push (
          <div
            key={key}
            className={`${pollClassName} ${(i % 2 === 0) ? 'app-poll-pollItemEven' : 'app-poll-pollItemOdd'}`}
            onClick={() => { this.setState ({ selected: i }); }}
          >
            {check}{choice}
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
        onClick={() => { this.props.router.push ('/'); }}
      >
        Back to Polls
      </button>
    );

    return (
      <div className='app-page-content'>
        <h1><center>{this.state.poll.title}</center></h1>
        <div className='app-poll-items'>
          {rows}
        </div>
        <p className='app-poll-hint'>
          Select your favorite, the poll results will be shown after you vote.
        </p>
        <div className='app-form-buttonArea'>
          {buttons}
        </div>
      </div>
    );
  }
}

export default withRouter (PollPage);

/* eslint react/forbid-prop-types: off */
PollPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

PollPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
