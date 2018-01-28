import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from './LoginForm.jsx';
import { login } from '../../store/userActions';
import { createField, validateField, getFieldValues, inString, outString } from '../util/formHelpers';

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
