import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm.jsx';
import { register, login } from '../../store/userActions';
import { createField, preValidate, updateFieldValue, updateFieldValidation, validateAll } from '../util/formHelpers';
import { isNotEmpty, isValidPassword } from '../util/validators';

const defaultText = 'Enter profile information';

class RegisterPage extends Component {
  constructor (props, context) {
    super (props, context);
    this.duplicate = false;

    this.isMatching = this.isMatching.bind (this);
    this.isNotDuplicate = this.isNotDuplicate.bind (this);

    const fields = {
      username: createField ('username', '', [
        { fn: isNotEmpty, text: 'Required (Up to 20 letters/digits, no spaces)' },
        { fn: this.isNotDuplicate, text: 'User name exists, choose another' },
      ]),
      password: createField ('password', '', [
        { fn: isNotEmpty, text: 'Password is required' },
        { fn: isValidPassword, text: 'Invalid password' },
        { fn: this.isMatching, text: 'Password and verify password don\'t match' },
      ]),
      verifyPassword: createField ('verifyPassword', '', [
        { fn: isNotEmpty, text: 'Verify password is required' },
        { fn: isValidPassword, text: 'Invalid password' },
        { fn: this.isMatching, text: 'Password and verify password don\'t match' },
      ]),
    };
    preValidate (fields);

    this.state = {
      message: { status: 'info', text: defaultText },
      fields,
    };

    this.onChange = this.onChange.bind (this);
    this.onValidate = this.onValidate.bind (this);
    this.onValidateForm = this.onValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  onChange (field, value) {
    this.setState (updateFieldValue (field, value));
  }

  onValidate (field) {
    this.setState (updateFieldValidation (field));
    // reset message to default if ok or error message is displayed
    if (this.state.message.status !== 'info') {
      this.setState (() => { return { message: { status: 'info', text: defaultText } }; });
    }
  }

  onValidateForm () {
    const updates = validateAll (this.state.fields);
    this.setState (() => { return { fields: updates }; });
    return (! (updates.username.error || updates.password.error || updates.verifyPassword.error));
  }

  onSubmit (event) {
    event.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState (() => { return { message: { status: 'working', text: 'Registering ...' } }; });
      this.props.dispatch (register (this.state.fields.username.value, this.state.fields.password.value))
      .then (() => {
        this.props.dispatch (login (this.state.fields.username.value, this.state.fields.password.value))
        .then (() => {
          this.props.history.replace ('/');
        })
        .catch (() => {
          this.setState (() => { return { message: { status: 'error', text: 'Registered, but could not login' } }; });
        });
      })
      .catch (() => {
        this.setState (() => { return { message: { status: 'error', text: 'Error registering, try again' } }; });
      });
    } else {
      this.setState ({ message: { status: 'error', text: 'Invalid content, check and try again' } });
    }
  }

  isMatching () {
    return this.state.fields.password.value === this.state.fields.verifyPassword.value;
  }

  isNotDuplicate () {
    return (this.duplicate === false);
  }

  render () {
    return (
      <RegisterForm
        message={this.state.message}
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect (null) (RegisterPage);

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape ({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
