import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageContent } from '../style/Page';
import { Form, Field, Row, Box, Divider } from '../style/Layout';
import { Heading, SubHeading, P } from '../style/Text';
import { Button } from '../style/Button';
import IntegerInput from '../ui/IntegerInput.jsx';
import { addPoll, updatePoll, deletePoll } from '../../store/pollsActions';

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
    const polls = nextProps.polls.filter ((poll) => {
      return poll.creator === nextProps.username;
    });
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

  async onAddPoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    try {
      await this.props.dispatch (addPoll (this.state.title, choices, this.state.voteLimit,
        this.state.maxVotes, this.state.dateLimit, this.state.endDate));
    } finally {
      this.setState (getDefaults ());
    }
  }

  async onSavePoll () {
    const choices = this.state.choices.slice (0, this.state.choices.length - 1);
    try {
      await this.props.dispatch (updatePoll (this.state.selected, this.state.title, choices,
        this.state.voteLimit, this.state.maxVotes, this.state.dateLimit, this.state.endDate));
    } catch (err) {
      // no op
    }
  }

  async onDeletePoll () {
    try {
      await this.props.dispatch (deletePoll (this.state.selected));
    } catch (err) {
      // no op
    }
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
      <option key='create' value='create'>
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

    return (
      <PageContent>
        <Heading center>Manage Polls</Heading>
        <Form center w='400px'>
          <Field>
            <label htmlFor='id-mypolls'>My polls</label>
            <select
              id='id-mypolls'
              value={this.state.selected}
              autoFocus
              onChange={(e) => { this.onSelectPoll (e.target.value); }}
            >
              {polls}
            </select>
          </Field>

          <Box mt='20px' pl='8px' pr='8px'>
            <SubHeading>{newPoll ? 'Add a new poll' : 'Edit poll'}</SubHeading>
            <Field>
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
            </Field>
            {choices}
            <Divider extend='8px' />
            <Row>
              <SubHeading>Closing Criteria</SubHeading>
              <Field>
                <label htmlFor='id-limit1'>
                  <input
                    id='id-limit1'
                    type='checkbox'
                    checked={this.state.voteLimit}
                    onChange={(e) => { this.setState ({ voteLimit: e.target.checked }); }}
                  />
                  Vote Limit
                </label>
                <IntegerInput
                  value={this.state.maxVotes}
                  onChange={(maxVotes) => { this.setState ({ maxVotes }); }}
                />
              </Field>
              <Field>
                <label htmlFor='id-limit2'>
                  <input
                    id='id-limit2'
                    type='checkbox'
                    checked={this.state.dateLimit}
                    onChange={(e) => { this.setState ({ dateLimit: e.target.checked }); }}
                  />
                  End Date
                </label>
                <input
                  value={this.state.endDate}
                  onChange={(e) => { this.setState ({ endDate: e.target.value }); }}
                />
              </Field>
            </Row>
            <Divider extend='8px' />
            <Row center>
              { newPoll ?
                <Button mt='16px' mb='16px' onClick={this.onAddPoll}>Add Poll</Button> :
                <Fragment>
                  <Button mt='16px' mb='16px' onClick={this.onSavePoll}>Save Poll</Button>
                  <Button mt='16px' mb='16px' onClick={this.onDeletePoll}>Delete Poll</Button>
                </Fragment>
              }
            </Row>
          </Box>
        </Form>
        {
          (newPoll) ? null :
          <Row>
            <SubHeading center>Share this Poll</SubHeading>
            <P center>
              https://pollster-jm.herokuapp.com/polls/{this.state.selected}
            </P>
          </Row>
        }
      </PageContent>
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
    <Field>
      <label htmlFor={props.id}>Choice {props.index + 1}</label>
      <input
        id={props.id}
        type='text'
        value={props.choice}
        maxLength={30}
        onChange={(e) => {
          props.onChange (props.index, e.target.value.trim ());
        }}
      />
    </Field>
  );
};

Choice.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  choice: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
