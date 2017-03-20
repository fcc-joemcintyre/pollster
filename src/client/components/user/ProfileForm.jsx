import React, { PropTypes } from 'react';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';

const nameChars = /[A-Za-z -.,]/;

const ProfileForm = ({ message, fields: { name, email }, onChange, onValidate, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
    }
  }

  return (
    <div className='app-page-content'>
      <h1><center>Profile</center></h1>
      <div className='app-form-statusArea'>
        <span className={`app-form-status-${message.status}`}>
          {message.text}
        </span>
      </div>
      <div className='app-form-layout'>
        <form
          className='app-form-form'
          style={{ width: '280px' }}
          onSubmit={onSubmit}
        >
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='name'>Name</label>
            <FilteredInput
              id='name'
              className='app-form-component'
              style={{ width: '260px' }}
              type='text'
              ref={(ref) => { focusRef = ref; }}
              autoFocus
              maxLength={40}
              filter={nameChars}
              value={name.value}
              onChange={(e) => { onChange (name, e.target.value); }}
              onBlur={() => { onValidate (name); }}
            />
            {
              name.error ?
                <div className='app-form-hint' style={{ color: 'red' }}>Max length is 40 characters</div> :
                <div className='app-form-hint'>Your full name</div>
            }
          </div>
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='email'>email</label>
            <input
              id='email'
              className='app-form-component'
              type='text'
              maxLength={60}
              autoCapitalize='none'
              autoCorrect='off'
              value={email.value}
              onChange={(e) => { onChange (email, e.target.value); }}
              onBlur={() => { onValidate (email); }}
            />
            {
              email.error ?
                <div className='app-form-hint' style={{ color: 'red' }}>Invalid email address</div> :
                <div className='app-form-hint'>Your email address</div>
            }
          </div>
          <div className='app-form-buttonArea'>
            <button
              className='app-form-button'
              onClick={(e) => {
                resetFocus ();
                onSubmit (e);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    name: PropTypes.shape (fieldPropTypes).isRequired,
    email: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
