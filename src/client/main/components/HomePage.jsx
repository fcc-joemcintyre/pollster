import React from 'react';
import { withRouter } from 'react-router';

class HomePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const s = context.store.getState ();
    this.state = {
      polls: s.polls,
      loggedIn: s.user.authenticated,
    };
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      const s = this.context.store.getState ();
      if (this.state.polls !== s.polls) {
        this.setState ({ polls: s.polls, loggedIn: s.user.authenticated });
      }
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    const polls = this.state.polls;
    const rows = [];
    if (polls.length === 0) {
      rows.push (<p>{' '}</p>);
      rows.push (<p>There are no active polls - be the first to add a new one!</p>);
    } else {
      for (let i = 0; i < polls.length; i ++) {
        const totalVotes = polls[i].choices.reduce ((a, b) => { return a + b.votes; }, 0);
        rows.push (
          <div
            key={polls[i]._id}
            className={(i % 2 === 0) ? 'poll even' : 'poll odd'}
            onClick={() => { this.props.router.push (`/polls/${polls[i]._id}`); }}
          >
            <span className='name'>{polls[i].title}</span>
            <span className='votes'>{totalVotes} votes</span>
          </div>
        );
      }
    }
    let message = null;
    if (this.state.loggedIn === false) {
      message = (
        <div className='homeMessage'>
          <p>Welcome to Pollster, your place to vote and create new polls!</p>
          <p>To create your own polls, <i>Register</i> to create a free account
            and then <i>Login</i> anytime to manage your polls and see the results.</p>
          <hr />
        </div>
      );
    }

    return (
      <div className='homePage'>
        {message}
        <h2>Active Polls</h2>
        <div className='pollList'>
          {rows}
        </div>
      </div>
    );
  }
}

export default withRouter (HomePage);

/* eslint react/forbid-prop-types: off */
HomePage.propTypes = {
  router: React.PropTypes.object.isRequired,
};

HomePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
