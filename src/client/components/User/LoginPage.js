import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { LoginForm } from './LoginForm';
import { login } from '../../store/userActions';
import { createField, getFieldValues, defaultOnChange, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';
import { isPassword } from '../../lib/validators';

const defaultText = 'Enter login information';

class LoginPageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        username: createField ('username', '', true, [], 'Your user name'),
        password: createField ('password', '', true, [isPassword], 'Your password'),
      },
      message: { status: 'info', text: defaultText },
      redirectToReferrer: false,
    };

    this.onChange = defaultOnChange.bind (this);
    this.onValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  async onSubmit (e) {
    e.preventDefault ();
    const errors = this.onValidateForm ();
    if (! errors) {
      this.setState ({ message: { status: 'working', text: 'Logging in' } });
      try {
        const { username, password } = getFieldValues (this.state.fields);
        await this.props.dispatch (login (username, password));
        this.setState ({ message: { status: 'ok', text: 'Logged in' }, redirectToReferrer: true });
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error logging in, check values' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Complete form and try again' } });
    }
    return errors;
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <LoginForm
        message={this.state.message}
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export const LoginPage = connect (null) (LoginPageBase);

LoginPageBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape ({
    state: PropTypes.shape ({
      from: PropTypes.shape ({}),
    }),
  }).isRequired,
};
