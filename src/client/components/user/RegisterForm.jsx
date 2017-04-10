import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';

const nameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

const RegisterForm = ({ message, fields: { username, password, verifyPassword }, onChange, onValidate, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
    }
  }

  return (
    <div className='app-page-content'>
      <h1>Register</h1>
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
            <label className='app-form-label' htmlFor='username'>User name</label>
            <FilteredInput
              id='username'
              className='app-form-component'
              style={{ width: '260px' }}
              type='text'
              ref={(ref) => { focusRef = ref; }}
              autoFocus
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              filter={nameChars}
              value={username.value}
              onChange={(e) => { onChange (username, e.target.value); }}
              onBlur={() => { onValidate (username); }}
            />
            {
              username.touched && username.error ?
                <div className='app-form-hint' style={{ color: 'red' }}>{username.error}</div> :
                <div className='app-form-hint'>Up to 20 letters/digits, no spaces</div>
            }
          </div>
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='password'>Password</label>
            <FilteredInput
              id='password'
              className='app-form-component'
              style={{ width: '260px' }}
              type='password'
              maxLength={20}
              filter={passwordChars}
              value={password.value}
              onChange={(e) => { onChange (password, e.target.value); }}
              onBlur={() => { onValidate (password); onValidate (verifyPassword); }}
            />
            {
              password.touched && password.error ?
                <div className='app-form-hint' style={{ color: 'red' }}>{password.error}</div> :
                <div className='app-form-hint'>Your password</div>
            }
          </div>
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='verify'>Verify Password</label>
            <FilteredInput
              id='verify'
              className='app-form-component'
              style={{ width: '260px' }}
              type='password'
              maxLength={20}
              filter={passwordChars}
              value={verifyPassword.value}
              onChange={(e) => { onChange (verifyPassword, e.target.value); }}
              onBlur={() => { onValidate (verifyPassword); onValidate (password); }}
            />
            {
              verifyPassword.touched && verifyPassword.error ?
                <div className='app-form-hint' style={{ color: 'red' }}>{verifyPassword.error}</div> :
                <div className='app-form-hint'>Verify your password</div>
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

export default RegisterForm;

RegisterForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
    verifyPassword: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
