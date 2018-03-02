import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProfileForm } from './ProfileForm';
import { updateProfile } from '../../store/userActions';
import { createField, getFieldValues, inString, outString, defaultOnChange, defaultOnValidate, defaultOnValidateForm }
  from '../../lib/formkit/formHelpers';
import { isEmail } from '../../lib/validators';

const defaultText = 'Enter profile information';

export class ProfilePageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        name: createField ('name', props.name, true, [], inString, outString),
        email: createField ('email', props.email, false, [isEmail], inString, outString),
        theme: createField ('theme', props.theme, false, [], inString, outString),
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
    if (this.onValidateForm ()) {
      this.setState ({ message: { status: 'working', text: 'Updating profile ...' } });
      try {
        const { name, email, theme } = getFieldValues (this.state.fields);
        await this.props.dispatch (updateProfile (name, email, theme));
        this.setState ({ message: { status: 'ok', text: 'Profile updated' } });
      } catch (err) {
        this.setState ({ message: { status: 'error', text: 'Error saving profile information' } });
      }
    } else {
      this.setState ({ message: { status: 'error', text: 'Invalid content, check and try again' } });
    }
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
};
