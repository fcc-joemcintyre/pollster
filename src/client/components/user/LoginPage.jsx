import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from './LoginForm.jsx';
import { login } from '../../store/userActions';
import { createField, getFieldValues, inString, outString,
  defaultOnChange, defaultOnValidate, defaultOnValidateForm } from '../util/formHelpers';

const defaultText = 'Enter login information';

class LoginPage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        username: createField ('username', '', true, [], inString, outString),
        password: createField ('password', '', true, [], inString, outString),
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
    if (this.onValidateForm ()) {
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

export default connect (null) (LoginPage);

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape ({
    state: PropTypes.shape ({
      from: PropTypes.shape ({}),
    }),
  }).isRequired,
};
