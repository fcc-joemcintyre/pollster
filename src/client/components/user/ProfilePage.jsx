import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm.jsx';
import { updateProfile } from '../../store/userActions';
import { createField, validateField, getFieldValues, inString, outString } from '../util/formHelpers';
import { isEmail } from '../util/validators';

const defaultText = 'Enter profile information';

class ProfilePage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fields: {
        name: createField ('name', props.name, true, [], inString, outString),
        email: createField ('email', props.email, false, [isEmail], inString, outString),
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
      this.setState ({ message: { status: 'working', text: 'Updating profile ...' } });
      try {
        const { name, email } = getFieldValues (this.state.fields);
        await this.props.dispatch (updateProfile (name, email));
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
});

export default connect (mapStateToProps) (ProfilePage);

ProfilePage.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
