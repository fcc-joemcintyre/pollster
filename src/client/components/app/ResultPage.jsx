import React from 'react';

export default class ResultPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const polls = context.store.getState ().polls;
    this.state = {
      selected: (polls.length > 0) ? 0 : -1,
    };
  }

  render () {
    const store = this.context.store.getState ();
    const myPolls = store.polls.filter ((poll) => {
      return (poll.creator === store.user.username);
    });

    // if no active polls for user, display message
    if (myPolls.length === 0) {
      return (
        <div className='messageForm'>
          <p>You do not have any active polls.</p>
        </div>
      );
    }

    const polls = [];
    for (let i = 0; i < myPolls.length; i ++) {
      polls.push (
        <option className='app-results-option' key={i} value={i}>
          {myPolls[i].title}
        </option>
      );
    }

    const choices = [];
    let totalVotes = 0;
    if (this.state.selected >= 0) {
      const currentPoll = myPolls[this.state.selected];
      totalVotes = currentPoll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
      for (let i = 0; i < currentPoll.choices.length; i ++) {
        const choice = currentPoll.choices[i];
        const text = <span className='app-results-name'>{choice.text}</span>;
        const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
        const percentText = <span className='app-results-votes'>{percent}%</span>;
        const color = 'lightsteelblue';
        const c = '-webkit-linear-gradient';
        const grad = `${c}(left, ${color} 0%, ${color} ${percent}%, #F0F8FF ${percent}%, #F0F8FF)`;
        choices.push (
          <div
            key={i}
            className={'app-results-poll'}
            style={{ background: grad, border: '1px solid #EEEEEE' }}
          >
            {text}{percentText}
          </div>
        );
      }
    }

    return (
      <div className='app-page'>
        <div className='app-results-selectArea'>
          <div className='app-results-label1'>My Polls</div>
          <select
            className='app-results-select'
            value={this.state.selected}
            size={5}
            autoFocus
            onChange={(e) => { this.setState ({ selected: e.target.value }); }}
          >
            {polls}
          </select>
        </div>
        <div className='app-results-label2'>Poll Results</div>
        <div className='app-results-display'>
          <div className='app-results-title'>{(this.state.selected !== -1) ? myPolls[this.state.selected].title : ''}</div>
          <p className='app-results-totalVotes'>Total Votes: {totalVotes}</p>
          {choices}
        </div>
      </div>
    );
  }
}

ResultPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
