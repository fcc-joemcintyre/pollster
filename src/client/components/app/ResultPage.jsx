import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class ResultPage extends React.Component {
  constructor (props) {
    super (props);
    this.polls = props.polls.filter ((poll) => { return poll.creator === props.username; });
    this.options = this.polls.map ((poll) => {
      return (
        <option className='app-results-option' key={poll._id} value={poll._id}>
          {poll.title}
        </option>
      );
    });

    this.state = {
      selected: (this.polls.length === 0) ? 0 : this.polls[0]._id,
    };
  }

  render () {
    // if no polls for user, display message
    if (this.polls.length === 0) {
      return (
        <div className='app-page-content'>
          <h1>Poll Results</h1>
          <p style={{ textAlign: 'center' }}>You do not have any polls yet</p>
        </div>
      );
    }

    const currentPoll = this.polls.find ((poll) => { return poll._id === this.state.selected; });
    const totalVotes = currentPoll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
    const choices = currentPoll.choices.map ((choice) => {
      const text = <span className='app-results-name'>{choice.text}</span>;
      const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
      const percentText = <span className='app-results-votes'>{percent}%</span>;
      const color = 'lightsteelblue';
      const c = '-webkit-linear-gradient';
      const grad = `${c}(left, ${color} 0%, ${color} ${percent}%, #F0F8FF ${percent}%, #F0F8FF)`;
      return (
        <div
          key={choice.text}
          className={'app-results-poll'}
          style={{ background: grad, border: '1px solid #EEEEEE' }}
        >
          {text}{percentText}
        </div>
      );
    });

    return (
      <div className='app-page-content'>
        <h1>Poll Results</h1>
        <div className='app-results-selectArea'>
          <div className='app-results-label'>My Polls</div>
          <select
            className='app-results-select'
            size={5}
            autoFocus
            value={this.state.selected}
            onChange={(e) => { this.setState ({ selected: e.target.value }); }}
          >
            {this.options}
          </select>
        </div>
        <div className='app-results-displayArea'>
          <div className='app-results-label'>Poll Results</div>
          <div className='app-results-display'>
            <div className='app-results-title'>{currentPoll.title}</div>
            <p className='app-results-totalVotes'>Total Votes: {totalVotes}</p>
            {choices}
          </div>
        </div>
      </div>
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
