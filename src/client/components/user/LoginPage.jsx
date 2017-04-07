import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from './LoginForm.jsx';
import { login } from '../../store/userActions';
import { createField, updateFieldValue } from '../util/formHelpers';

const defaultText = 'Enter login information';

class LoginPage extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      message: { status: 'info', text: defaultText },
      fields: {
        username: createField ('username', '', []),
        password: createField ('password', '', []),
      },
      redirectToReferrer: false,
    };

    this.onChange = this.onChange.bind (this);
    this.onValidateForm = this.onValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  onChange (field, value) {
    this.setState (updateFieldValue (field, value));
  }

  onValidateForm () {
    return ((this.state.fields.username.value.trim () !== '') &&
      (this.state.fields.password.value.trim () !== ''));
  }

  onSubmit (e) {
    e.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState (() => { return { message: { status: 'working', text: 'Logging in' } }; });
      this.props.dispatch (login (this.state.fields.username.value, this.state.fields.password.value))
      .then (() => {
        this.setState (() => { return { message: { status: 'ok', text: 'Logged in' }, redirectToReferrer: true }; });
      })
      .catch (() => {
        this.setState (() => { return { message: { status: 'error', text: 'Error logging in, check values' } }; });
      });
    } else {
      this.setState (() => { return { message: { status: 'error', text: 'Complete form and try again' } }; });
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
