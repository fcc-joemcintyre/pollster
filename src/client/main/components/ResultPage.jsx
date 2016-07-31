import React from 'react';

export default class ResultPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let polls = context.store.getState ().polls;
    this.state = {
      selected: (polls.length > 0) ? 0 : -1
    }
  }

  render () {
    let store = this.context.store.getState ();
    let myPolls = store.polls.filter (poll => {
      return (poll.creator === store.user.username);
    });

    // if no active polls for user, display message
    if (myPolls.length === 0) {
      return (
        <div className='messageForm'>
          <p>You do not have any active polls.</p>
        </div>
      )
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
      totalVotes = myPolls[this.state.selected].choices.reduce ((a, b) => a + b.votes, 0);
      for (let i = 0; i < myPolls[this.state.selected].choices.length; i ++) {
        let choice = myPolls[this.state.selected].choices[i];
        let text = <span className='name'>{choice.text}</span>;
        let percent = (totalVotes === 0) ? 0 : Math.floor (choice.votes / totalVotes * 100);
        let percentText = <span className='votes'>{percent}%</span>;
        let gradient = `-webkit-linear-gradient(left, lightsteelblue 0%, lightsteelblue ${percent}%, #F0F8FF ${percent}%, #F0F8FF)`;
        choices.push (
          <div key={i} className={'poll'}
            style={{background: gradient, border: '1px solid #EEEEEE'}}>
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
            autoFocus={true}
            onChange={(e) => {this.setState ({selected: e.target.value})}}>
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
  store: React.PropTypes.object.isRequired
}
