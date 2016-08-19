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
    const myPolls = store.polls.filter (poll => {
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

    let polls = [];
    for (let i = 0; i < myPolls.length; i ++) {
      polls.push (
        <option key={i} value={i}>
          {myPolls[i].title}
        </option>
      );
    }

    let choices = [];
    let totalVotes = 0;
    if (this.state.selected >= 0) {
      const currentPoll = myPolls[this.state.selected];
      totalVotes = currentPoll.choices.reduce ((a, b) => { return a + b.votes; }, 0);
      for (let i = 0; i < currentPoll.choices.length; i ++) {
        const choice = currentPoll.choices[i];
        let text = <span className='name'>{choice.text}</span>;
        let percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
        let percentText = <span className='votes'>{percent}%</span>;
        const color = 'lightsteelblue';
        const c = '-webkit-linear-gradient';
        const grad = `${c}(left, ${color} 0%, ${color} ${percent}%, #F0F8FF ${percent}%, #F0F8FF)`;
        choices.push (
          <div
            key={i}
            className={'poll'}
            style={{ background: grad, border: '1px solid #EEEEEE' }}
          >
            {text}{percentText}
          </div>
        );
      }
    }

    return (
      <div className='resultArea'>
        <div className='selectArea'>
          <h2>My Polls</h2>
          <select
            value={this.state.selected}
            size={5}
            autoFocus
            onChange={(e) => { this.setState ({ selected: e.target.value }); }}
          >
            {polls}
          </select>
        </div>
        <div className='displayArea'>
          <h2>Poll Results</h2>
          <h2>{(this.state.selected !== -1) ? myPolls[this.state.selected].title : ''}</h2>
          <p className='totalVotes'>Total Votes: {totalVotes}</p>
          {choices}
        </div>
      </div>
    );
  }
}

ResultPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
