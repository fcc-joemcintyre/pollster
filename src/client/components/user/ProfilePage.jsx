import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm.jsx';
import { updateProfile } from '../../store/userActions';
import { createField, preValidate, updateFieldValue, updateFieldValidation, validateAll } from '../util/formHelpers';
import { isLengthValid, isEmptyOrValidEmail } from '../util/validators';

const defaultText = 'Enter profile information';

class ProfilePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const fields = {
      name: createField ('name', props.name, [
        { fn: isLengthValid (0, 40), text: 'Must be less than 40 letters' },
      ]),
      email: createField ('email', props.email, [
        { fn: isEmptyOrValidEmail, text: 'Invalid email address' },
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
    if (this.state.message.status !== 'info') {
      this.setState (() => { return { message: { status: 'info', text: defaultText } }; });
    }
  }

  onValidateForm () {
    const updates = validateAll (this.state.fields);
    this.setState (() => { return { fields: updates }; });
    return (! (updates.name.error || updates.email.error));
  }

  onSubmit (event) {
    event.preventDefault ();
    if (this.onValidateForm ()) {
      this.setState ({ message: { status: 'working', text: 'Updating profile ...' } });
      this.props.dispatch (updateProfile (this.state.fields.name.value, this.state.fields.email.value))
      .then (() => {
        this.setState ({ message: { status: 'ok', text: 'Profile updated' } });
      })
      .catch (() => {
        this.setState ({ message: { status: 'error', text: 'Error saving profile information' } });
      });
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

const mapStateToProps = ({ user }) => {
  return ({
    name: user.name,
    email: user.email,
  });
};

export default connect (mapStateToProps) (ProfilePage);

ProfilePage.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
