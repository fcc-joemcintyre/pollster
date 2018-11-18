import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProfileForm } from './ProfileForm';
import { updateProfile } from '../../store/userActions';
import { createField, getFieldValues, defaultOnChange, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';
import { isEmail } from '../../lib/validators';

const defaultText = 'Enter profile information';

export class ProfilePageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        name: createField ('name', props.name, true, [], 'Your name'),
        email: createField ('email', props.email, false, [isEmail], 'Your email address'),
        theme: createField ('theme', props.theme, false, [], 'Pick a theme you like'),
      },
      message: { status: 'info', text: defaultText },
    };

    this.onChange = defaultOnChange.bind (this);
    this.onValidate = defaultOnValidate.bind (this);
    this.onValidateForm = defaultOnValidateForm.bind (this);
    this.onSubmit = this.onSubmit.bind (this);
  }

  async onSubmit (event) {
    event.preventDefault ();
    const errors = this.onValidateForm ();
    if (! errors) {
      this.setState ({ message: { status: 'working', text: 'Updating profile ...' } });
      try {
        const { name, email, theme } = getFieldValues (this.state.fields);
        await this.props.dispatch (updateProfile (name, email, theme));
        this.props.history.replace ('/');
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error saving profile information' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Invalid content, check and try again' } });
    }
    return errors;
  }

  render () {
    return (
      <ProfileForm
        message={this.state.message}
        fields={this.state.fields}
        onChange={this.onChange}
        onValidate={this.onValidate}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({
  name: user.name,
  email: user.email,
  theme: user.theme || 'base',
});

export const ProfilePage = connect (mapStateToProps) (ProfilePageBase);

ProfilePageBase.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape ({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
