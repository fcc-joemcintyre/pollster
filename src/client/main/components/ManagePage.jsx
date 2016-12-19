import React from 'react';
import { addPoll, updatePoll, deletePoll } from '../store/actions';

export default class ManagePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const allPolls = context.store.getState ().polls;
    const creator = context.store.getState ().user.username;
    const myPolls = allPolls.filter ((poll) => {
      return (poll.creator === creator);
    });
    this.state = {
      polls: myPolls,
      creator,
      selected: 'create',
      title: '',
      choices: ['', ''],
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
      const myPolls = allPolls.filter ((poll) => {
        return (poll.creator === creator);
      });
      this.setState ({
        polls: myPolls,
        creator,
        selected: 'create',
        title: '',
        choices: ['', ''],
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  onSelectPoll (_id) {
    if (_id === 'create') {
      this.setState ({
        selected: 'create',
        title: '',
        choices: ['', ''],
      });
    } else {
      const selected = this.state.polls.find ((poll) => { return poll._id === _id; });
      this.setState ({
        selected: _id,
        title: selected.title,
        choices: generateChoices (selected.choices),
      });
    }
  }

  onAddPoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    this.context.store.dispatch (addPoll (this.state.title, choices));
    this.setState ({ title: '', choices: ['', ''], selected: 'create' });
  }

  onSavePoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    this.context.store.dispatch (updatePoll (this.state.selected, this.state.title, choices));
  }

  onDeletePoll () {
    this.context.store.dispatch (deletePoll (this.state.selected));
  }

  render () {
    const newPoll = (this.state.selected === 'create');
    const polls = this.state.polls.map ((poll) => {
      return (
        <option key={poll._id} value={poll._id}>
          {poll.title}
        </option>
      );
    });
    polls.unshift (
      <option key={'create'} value={'create'}>
        {'<Create new poll>'}
      </option>
    );

    /* eslint react/no-array-index-key: off */
    // Poll edit area
    const choices = this.state.choices.map ((choice, index) => {
      return (
        <Choice
          key={`choice${index}`}
          id={`id-choice-${index}`}
          choice={choice}
          index={index}
          onChange={(i, text) => {
            const temp = this.state.choices.slice (0);
            temp[i] = text;
            const list = temp.filter ((a) => { return (a.length > 0); });
            list.push ('');
            if (list.length === 1) {
              list.push ('');
            }
            this.setState ({ choices: list });
          }}
        />
      );
    });
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
    const poll = (
      <div>
        <div>
          <label htmlFor='id-title'>Title</label>
          <input
            id='id-title'
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
          <p>http://pollster-jm.herokuapp.com/polls/{this.state.selected}</p>
        </div>
      );
    }

    return (
      <div className='managePage'>
        <div className='editArea'>
          <div className='selectPoll'>
            <label htmlFor='id-mypolls'>My polls</label>
            <select
              id='id-mypolls'
              value={this.state.selected}
              autoFocus
              onChange={(e) => { this.onSelectPoll (e.target.value); }}
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
      result = list.map ((item) => { return item.text; });
      result.push ('');
      break;
  }
  return result;
}

ManagePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

const Choice = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>Choice</label>
      <input
        id={props.id}
        type='text'
        value={props.choice}
        maxLength={30}
        onChange={(e) => {
          props.onChange (props.index, e.target.value.trim ());
        }}
      />
    </div>
  );
};

Choice.propTypes = {
  id: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  choice: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
