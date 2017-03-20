import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render () {
    const polls = this.props.polls;
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
            className={(i % 2 === 0) ? 'app-home-poll app-home-even' : 'app-home-poll app-home-odd'}
            onClick={() => { this.props.history.push (`/polls/${polls[i]._id}`); }}
          >
            <span className='app-home-name'>{polls[i].title}</span>
            <span className='app-home-votes'>{totalVotes} votes</span>
          </div>
        );
      }
    }
    let message = null;
    if (this.props.authenticated === false) {
      message = (
        <div className='app-home-message'>
          <p>Welcome to Pollster, your place to vote and create new polls!</p>
          <p>To create your own polls, <i>Register</i> to create a free account
            and then <i>Login</i> anytime to manage your polls and see the results.</p>
          <hr className='app-home-divider' />
        </div>
      );
    }

    return (
      <div className='app-page-content'>
        {message}
        <h1>Active Polls</h1>
        <div className='app-home-list'>
          {rows}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    authenticated: state.user.authenticated,
    polls: state.polls,
  });
};

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
  history: PropTypes.shape ({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
