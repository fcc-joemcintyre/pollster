import React from 'react';
import {Link, withRouter} from 'react-router';
import {getPoll} from '../store/polls';
import {vote} from '../store/actions';

class PollPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let _id = this.props.params._id;
    let poll = getPoll (context.store.getState (), _id);
    if (poll === null) {
      _id = -1;
    }
    this.state = {
      _id: _id,
      poll: poll,
      selected: -1,
      voted: false
    };
    this.handleVote = this.handleVote.bind (this);
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      let poll = getPoll (this.context.store.getState (), this.state._id);
      if (this.state.poll !== poll) {
        this.setState ({poll: poll});
      }
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  handleVote (event) {
    if (this.state.selected !== -1) {
      let poll = Object.assign ({}, this.state.poll);
      let choice = poll.choices[this.state.selected];
      choice.votes ++;
      this.setState ({voted: true, poll: poll});
      this.context.store.dispatch (vote (this.state.poll._id, choice.text));
    }
  }

  render () {
    if (this.state.poll === null) {
      return (
        <form className='messageForm' onSubmit={() => { this.props.router.push ('/') }}>
          <p>Sorry, could not find that poll for you.</p>
          <button>Back to Polls</button>
        </form>
      );
    }
    let totalVotes = this.state.poll.choices.reduce ((a, b) => a + b.votes, 0);
    let rows = [];
    for (let i = 0; i < this.state.poll.choices.length; i ++) {
      let check = (i === this.state.selected) ? <span>&#10003; </span> : <span></span>;
      let choice = <span>{this.state.poll.choices[i].text}</span>;
      let key = 'p-r-' + i;
      if (this.state.voted) {
        let percent = (totalVotes === 0) ? 0 : Math.floor (this.state.poll.choices[i].votes / totalVotes * 100);
        let percentText = <span className='votes'>{percent}%</span>;
        let gradient = `-webkit-linear-gradient(left, lightgreen 0%, lightgreen ${percent}%, #F0FFF0 ${percent}%, #F0FFF0)`;
        rows.push (
          <div key={key} className={'poll'}
            style={{background: gradient, border: '1px solid #E5FFCC'}}>
            {check}{choice}{percentText}
          </div>
        );
      } else {
        rows.push (
          <div key={key} className={(i % 2 === 0) ? 'poll even' : 'poll odd'}
            onClick={() => { this.setState ({selected: i}) }}>
            {check}{choice}
          </div>
        );
      }
    }

    let buttons = [];
    if (this.state.voted === false) {
      buttons.push (
        <button key='button1' className='dialogGroupButton' onClick={this.handleVote}>
          Vote
        </button>
      );
    }
    buttons.push (
      <button key='button2' className='dialogGroupButton' onClick={() => this.props.router.push ('/')}>
        Back to Polls
      </button>
    );

    return (
      <div className='pollPage'>
        <h2>{this.state.poll.title}</h2>
        <p>Select your favorite, the poll results will be shown after you vote.</p>
        <div className='pollItems'>
          {rows}
        </div>
        <div className='dialogGroupButtonArea'>
          {buttons}
        </div>
      </div>
    );
  }
}

export default withRouter (PollPage);

PollPage.contextTypes = {
  store: React.PropTypes.object.isRequired
}
