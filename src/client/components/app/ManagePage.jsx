import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPoll, updatePoll, deletePoll } from '../../store/pollsActions';
import IntegerInput from '../ui/IntegerInput.jsx';

function getDefaults () {
  return {
    selected: 'create',
    title: '',
    choices: ['', ''],
    voteLimit: false,
    maxVotes: 0,
    dateLimit: false,
    endDate: '',
  };
}

class ManagePage extends Component {
  constructor (props) {
    super (props);
    const polls = props.polls.filter ((poll) => { return poll.creator === props.username; });
    const creator = props.username;
    this.state = Object.assign ({ polls, creator }, getDefaults ());

    this.onSelectPoll = this.onSelectPoll.bind (this);
    this.onAddPoll = this.onAddPoll.bind (this);
    this.onSavePoll = this.onSavePoll.bind (this);
    this.onDeletePoll = this.onDeletePoll.bind (this);
  }

  componentWillReceiveProps (nextProps) {
    const polls = nextProps.polls.filter ((poll) => { return poll.creator === nextProps.username; });
    const creator = nextProps.username;
    this.setState (Object.assign ({ polls, creator }, getDefaults ()));
  }

  onSelectPoll (_id) {
    if (_id === 'create') {
      this.setState (getDefaults ());
    } else {
      const selected = this.state.polls.find ((poll) => { return poll._id === _id; });
      this.setState ({
        selected: _id,
        title: selected.title,
        choices: generateChoices (selected.choices),
        voteLimit: selected.voteLimit,
        maxVotes: selected.maxVotes,
        dateLimit: selected.dateLimit,
        endDate: selected.endDate,
      });
    }
  }

  onAddPoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    this.props.dispatch (addPoll (this.state.title, choices, this.state.voteLimit,
      this.state.maxVotes, this.state.dateLimit, this.state.endDate));
    this.setState (getDefaults ());
  }

  onSavePoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    this.props.dispatch (updatePoll (this.state.selected, this.state.title, choices,
      this.state.voteLimit, this.state.maxVotes, this.state.dateLimit, this.state.endDate));
  }

  onDeletePoll () {
    this.props.dispatch (deletePoll (this.state.selected));
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
        {'<Add a new poll>'}
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
        <div className='app-form-buttonArea'>
          <button className='app-form-button' onClick={this.onAddPoll}>Add Poll</button>
        </div>
      );
    } else {
      buttonArea = (
        <div className='app-form-buttonArea'>
          <button className='app-form-button' onClick={this.onSavePoll}>Save Poll</button>
          <button className='app-form-button' onClick={this.onDeletePoll}>Delete Poll</button>
        </div>
      );
    }

    return (
      <div className='app-page-content'>
        <div className='app-manage-content'>
          <h1>Manage Polls</h1>
          <div className='app-manage-box'>
            <label className='app-manage-topLabel' htmlFor='id-mypolls'>My polls</label>
            <select
              id='id-mypolls'
              className='app-manage-select'
              value={this.state.selected}
              autoFocus
              onChange={(e) => { this.onSelectPoll (e.target.value); }}
            >
              {polls}
            </select>
          </div>

          <div className='app-manage-box'>
            <h2>{newPoll ? 'Add a new poll' : 'Edit poll'}</h2>
            <div className='app-manage-section'>
              <label htmlFor='id-title' className='app-manage-label1'>Title</label>
              <input
                id='id-title'
                className='app-manage-input1 app-manage-vspacing'
                type='text'
                value={this.state.title}
                maxLength={30}
                onChange={(e) => {
                  this.setState ({ title: e.target.value });
                }}
              />
              {choices}
            </div>
            <hr className='app-manage-divider' />
            <div className='app-manage-section'>
              <div className='app-manage-subtitle'>Closing Criteria</div>
              <div className='app-manage-row'>
                <label htmlFor='id-limit1' className='app-manage-label2'>
                  <input
                    id='id-limit1'
                    className='app-manage-input2'
                    type='checkbox'
                    checked={this.state.voteLimit}
                    onChange={(e) => { this.setState ({ voteLimit: e.target.checked }); }}
                  />
                  Vote Limit
                </label>
                <IntegerInput
                  className='app-manage-maxVotes'
                  value={this.state.maxVotes}
                  onChange={(maxVotes) => { this.setState ({ maxVotes }); }}
                />
              </div>
              <div className='app-manage-row'>
                <label htmlFor='id-limit2' className='app-manage-label2'>
                  <input
                    id='id-limit2'
                    className='app-manage-input2'
                    type='checkbox'
                    checked={this.state.dateLimit}
                    onChange={(e) => { this.setState ({ dateLimit: e.target.checked }); }}
                  />
                  End Date
                </label>
                <input
                  className='app-manage-date'
                  value={this.state.endDate}
                  onChange={(e) => { this.setState ({ endDate: e.target.value }); }}
                />
              </div>
            </div>
            <hr className='app-manage-divider' />
            {buttonArea}
          </div>
        </div>
        {
          (newPoll) ? null :
          <div className='app-manage-sharePoll'>
            <h2>Share this Poll</h2>
            <p style={{ textAlign: 'center' }}>
              https://pollster-jm.herokuapp.com/polls/{this.state.selected}
            </p>
          </div>
        }
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

const mapStateToProps = (state) => {
  return ({
    username: state.user.username,
    polls: state.polls,
  });
};

export default connect (mapStateToProps) (ManagePage);

ManagePage.propTypes = {
  username: PropTypes.string.isRequired,
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Choice = (props) => {
  return (
    <div className='app-manage-row'>
      <label htmlFor={props.id} className='app-manage-label1'>Choice {props.index + 1}</label>
      <input
        id={props.id}
        className='app-manage-input1'
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
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  choice: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
