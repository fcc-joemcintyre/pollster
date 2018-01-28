import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm.jsx';
import { register, login } from '../../store/userActions';
import { createField, validateField, getFieldValues, inString, outString } from '../util/formHelpers';
import { isPassword } from '../util/validators';

const defaultText = 'Enter profile information';

class RegisterPage extends Component {
  constructor (props, context) {
    super (props, context);
    this.isMatching = this.isMatching.bind (this);
    this.state = {
      fields: {
        username: createField ('username', '', true, [], inString, outString),
        password: createField ('password', '', true, [isPassword, this.isMatching], inString, outString),
        verifyPassword: createField ('verifyPassword', '', true, [isPassword, this.isMatching], inString, outString),
      },
      message: { status: 'info', text: defaultText },
    };

    this.onChange = this.onChange.bind (this);
    this.onValidate = this.onValidate.bind (this);
    this.onValidateForm = this.onValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  onChange (field, value) {
    const f = { [field.name]: { ...this.state.fields[field.name], value } };
    this.setState (({ fields }) => ({ fields: { ...fields, ...f } }));
  }

  onValidate (field) {
    const f = this.state.fields[field.name];
    const error = validateField (f);
    if (error !== f.error) {
      this.setState (({ fields }) => ({ fields: { ...fields, [field.name]: { ...f, error } } }));
    }
    return error;
  }

  onValidateForm () {
    let result = true;
    for (const key of Object.keys (this.state.fields)) {
      result = (this.onValidate (this.state.fields[key]) === null) && result;
    }
    return result;
  }

  async onSubmit (event) {
    event.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState ({ message: { status: 'working', text: 'Registering ...' } });
      try {
        const { username, password } = getFieldValues (this.state.fields);
        await this.props.dispatch (register (username, password));
        try {
          await this.props.dispatch (login (username, password));
          this.props.history.replace ('/');
        } catch (err) {
          this.setState ({ message: { status: 'error', text: 'Registered, but could not login' } });
        }
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error registering, try again' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Invalid content, check and try again' } });
    }
  }

  isMatching () {
    return this.state.fields.password.value === this.state.fields.verifyPassword.value ? null : 'matching';
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
