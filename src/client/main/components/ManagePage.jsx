import React from 'react';
import { addPoll, updatePoll, deletePoll } from '../store/actions';

export default class ManagePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const allPolls = context.store.getState ().polls;
    const creator = context.store.getState ().user.username;
    const myPolls = allPolls.filter (poll => {
      return (poll.creator === creator);
    });
    this.state = {
      polls: myPolls,
      creator,
      selected: 0,
      title: (myPolls.length === 0) ? '' : myPolls[0].title,
      choices: (myPolls.length === 0) ? ['', ''] : generateChoices (myPolls[0].choices),
    };

    this.onSelectPoll = this.onSelectPoll.bind (this);
    this.onAddPoll = this.onAddPoll.bind (this);
    this.onSavePoll = this.onSavePoll.bind (this);
    this.onDeletePoll = this.onDeletePoll.bind (this);
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      const allPolls = this.context.store.getState ().polls;
      const creator = this.context.store.getState ().user.username;
      const myPolls = allPolls.filter (poll => {
        return (poll.creator === creator);
      });
      this.setState ({
        polls: myPolls,
        creator,
        selected: 0,
        title: (myPolls.length === 0) ? '' : myPolls[0].title,
        choices: (myPolls.length === 0) ? ['', ''] : generateChoices (myPolls[0].choices),
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  onSelectPoll (index) {
    if (index < this.state.polls.length) {
      this.setState ({
        selected: index,
        title: this.state.polls[index].title,
        choices: generateChoices (this.state.polls[index].choices),
      });
    } else {
      this.setState ({
        selected: index,
        title: '',
        choices: ['', ''],
      });
    }
  }

  onAddPoll () {
    const poll = {
      title: this.state.title,
      choices: this.state.choices.slice (0, this.state.choices.length - 1),
    };
    this.context.store.dispatch (addPoll (poll));
    this.setState ({ title: '', choices: ['', ''], selected: 0 });
  }

  onSavePoll () {
    const poll = {
      _id: this.state.polls[this.state.selected]._id,
      title: this.state.title,
      choices: this.state.choices.slice (0, this.state.choices.length - 1),
    };
    this.context.store.dispatch (updatePoll (poll));
  }

  onDeletePoll () {
    this.context.store.dispatch (deletePoll (this.state.polls[this.state.selected]._id));
  }

  render () {
    const newPoll = (this.state.selected === this.state.polls.length);
    let polls = [];
    for (let i = 0; i < this.state.polls.length; i ++) {
      polls.push (
        <option key={i} value={i}>
          {this.state.polls[i].title}
        </option>
      );
    }
    polls.push (
      <option key={this.state.polls.length} value={this.state.polls.length}>
        {'<Create new poll>'}
      </option>
    );

    // Poll edit area
    let choices = [];
    for (let i = 0; i < this.state.choices.length; i ++) {
      choices.push (
        <div key={i}>
          <label htmlFor='mp-choice'>Choice</label>
          <input
            id='mp-choice'
            type='text'
            value={this.state.choices[i]}
            maxLength={30}
            onChange={(e) => {
              this.state.choices[i] = e.target.value;
              let t2 = this.state.choices.filter (choice => { return choice.trim () !== ''; });
              if (t2.length === 0) {
                t2 = ['', ''];
              } else {
                t2.push ('');
              }
              this.setState ({ choices: t2 });
            }}
          />
        </div>
      );
    }
    let buttonArea;
    if (newPoll) {
      buttonArea = (
        <div className='buttonArea'>
          <button onClick={this.onAddPoll}>Add Poll</button>
        </div>
      );
    } else {
      buttonArea = (
        <div className='buttonArea'>
          <button onClick={this.onSavePoll}>Save Poll</button>
          <button onClick={this.onDeletePoll}>Delete Poll</button>
        </div>
      );
    }
    let poll = (
      <div>
        <div>
          <label htmlFor='mp-title'>Title</label>
          <input
            id='mp-title'
            type='text'
            value={this.state.title}
            maxLength={30}
            onChange={(e) => {
              this.setState ({ title: e.target.value });
            }}
          />
        </div>
        {choices}
      </div>
    );
    let share = null;
    if (newPoll === false) {
      share = (
        <div className='sharePoll'>
          <h2>Share this Poll</h2>
          <p>http://pollster-jm.herokuapp.com/polls/{this.state.polls[this.state.selected]._id}</p>
        </div>
      );
    }

    return (
      <div className='managePage'>
        <div className='editArea'>
          <div className='selectPoll'>
            <label htmlFor='mp-mypolls'>My polls</label>
            <select
              id='mp-mypolls'
              value={this.state.selected}
              autoFocus
              onChange={(e) => { this.onSelectPoll (Number (e.target.value)); }}
            >
              {polls}
            </select>
          </div>
          <div className='editPoll'>
            <h2>{newPoll ? 'Add a new poll' : 'Edit poll'}</h2>
            {poll}
            {buttonArea}
          </div>
        </div>
        {share}
      </div>
    );
  }
}

function generateChoices (list) {
  let result;
  switch (list.length) {
    case 0:
      result = ['', ''];
      break;
    case 1:
      result = [list[0].text, ''];
      break;
    default:
      result = [];
      for (const choice of list) {
        result.push (choice.text);
      }
      result.push ('');
      break;
  }
  return result;
}

ManagePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
