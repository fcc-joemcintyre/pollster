import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createField, getFieldValues, inString, outString, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';
import { PageContent, Row } from '../../lib/Layout';
import { Heading } from '../../lib/Text';
import { Modal } from '../../lib/Modal';
import { addPoll, updatePoll, deletePoll } from '../../store/pollsActions';
import { ManagePollSelect } from './ManagePollSelect';
import { ManageForm } from './ManageForm';

class ManagePageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        title: createField ('title', '', true, [], inString, outString),
        choice0: createField ('choice0', '', true, [], inString, outString),
        choice1: createField ('choice1', '', true, [], inString, outString),
      },
      selected: '',
      modal: null,
    };

    this.onChange = this.onChange.bind (this);
    this.onValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onResetPoll = this.onResetPoll.bind (this);
    this.onSelectPoll = this.onSelectPoll.bind (this);
    this.onSubmitPoll = this.onSubmitPoll.bind (this);
    this.onDeletePoll = this.onDeletePoll.bind (this);
    this.onCloseModal = this.onCloseModal.bind (this);
  }

  onChange (field, value) {
    const f = { [field.name]: { ...this.state.fields[field.name], value } };
    this.setState (({ fields }) => ({ fields: { ...fields, ...f } }), () => {
      // after update, determine if all choice fields have content
      const full = Object.keys (this.state.fields).reduce ((a, b) => {
        if (b.startsWith ('choice')) {
          return a || (this.state.fields[b].value.trim () === '');
        } else {
          return a;
        }
      }, false);
      // if all choice fields have content, add another choice field
      if (! full) {
        const next = `choice${Object.keys (this.state.fields).length - 1}`;
        const choice = { [next]: createField (next, '', false, [], inString, outString) };
        this.setState (({ fields }) => ({ fields: { ...fields, ...choice } }));
      }
    });
  }

  onResetPoll () {
    this.setState ({
      fields: {
        title: createField ('title', '', true, [], inString, outString),
        choice0: createField ('choice0', '', true, [], inString, outString),
        choice1: createField ('choice1', '', true, [], inString, outString),
      },
      selected: '',
    });
  }

  onSelectPoll (_id) {
    if (_id === '') {
      this.onResetPoll ();
    } else {
      const poll = this.props.polls.find (a => (a._id === _id));
      const choices = {};
      const length = poll.choices.length;
      for (let i = 0; i < length; i ++) {
        const required = i < 2;
        choices[`choice${i}`] = createField (`choice${i}`, poll.choices[i].text, required, [], inString, outString);
      }
      choices[`choice${length}`] = createField (`choice${length}`, '', false, [], inString, outString);

      this.setState ({
        fields: {
          title: createField ('title', poll.title, true, [], inString, outString),
          ...choices,
        },
        selected: _id,
      });
    }
  }

  async onSubmitPoll (e) {
    e.preventDefault ();
    if (this.onValidateForm ()) {
      try {
        this.setState ({ modal: { content: 'Submitting poll...' } });
        const { title, ...rest } = getFieldValues (this.state.fields);
        const choices = Object.values (rest).filter (a => (a !== ''));
        if (this.state.selected === '') {
          await this.props.dispatch (addPoll (title, choices));
          const content = 'New poll has been added.';
          this.setState ({ modal: { content, actions: ['OK'], closeAction: 'OK', tag: 'ok' } });
        } else {
          await this.props.dispatch (updatePoll (this.state.selected, title, choices));
          const content = 'Poll has been updated.';
          this.setState ({ modal: { content, actions: ['OK'], closeAction: 'OK', tag: 'ok' } });
        }
      } catch (err) {
        const content = 'Error submitting poll, try again.';
        this.setState ({ modal: { title: 'Error', content, actions: ['OK'], closeAction: 'OK', tag: 'error' } });
      }
    }
  }

  async onDeletePoll () {
    try {
      this.setState ({ modal: { content: 'Deleting poll...' } });
      await this.props.dispatch (deletePoll (this.state.selected));
      this.setState ({ modal: { content: 'Poll deleted', actions: ['OK'], closeAction: 'OK', tag: 'ok' } });
    } catch (err) {
      const content = 'Error deleting poll, refresh and try again.';
      this.setState ({ modal: { title: 'Error', content, actions: ['OK'], closeAction: 'OK', tag: 'error' } });
    }
  }

  onCloseModal (action, tag) {
    this.setState ({ modal: null });
    if (tag === 'ok') {
      this.onResetPoll ();
    }
  }

  render () {
    return (
      <PageContent>
        <Heading center>Manage Polls</Heading>
        <Row center>
          <ManagePollSelect
            polls={this.props.polls}
            selected={this.state.selected}
            onSelect={this.onSelectPoll}
          />
        </Row>
        <Row center>
          <ManageForm
            action={this.state.selected === '' ? 'add' : 'edit'}
            fields={this.state.fields}
            onChange={this.onChange}
            onValidate={this.onValidate}
            onSubmit={this.onSubmitPoll}
            onDelete={this.onDeletePoll}
          />
        </Row>
        { this.state.modal &&
          <Modal
            title={this.state.modal.title}
            actions={this.state.modal.actions}
            closeAction={this.state.modal.closeAction}
            content={this.state.modal.content}
            onClose={this.onCloseModal}
          />
        }
      </PageContent>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls.filter (poll => (poll.creator === state.user.username)),
});

export const ManagePage = connect (mapStateToProps) (ManagePageBase);

ManagePageBase.propTypes = {
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};
