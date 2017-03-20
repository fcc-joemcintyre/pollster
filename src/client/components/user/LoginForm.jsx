import React, { PropTypes } from 'react';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';

const usernameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

const LoginForm = ({ message, fields: { username, password }, onChange, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
    }
  }

  return (
    <div className='app-page-content'>
      <h1>Login</h1>
      <div className='app-form-statusArea'>
        <span className={`app-form-status-${message.status}`}>
          {message.text}
        </span>
      </div>
      <div className='app-form-layout'>
        <form
          className='app-form-form'
          style={{ width: '300px' }}
          onSubmit={onSubmit}
        >
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='username'>User name</label>
            <FilteredInput
              id='username'
              className='app-form-component'
              style={{ width: '280px' }}
              type='text'
              ref={(ref) => { focusRef = ref; }}
              autoFocus
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              filter={usernameChars}
              value={username.value}
              onChange={(e) => { onChange (username, e.target.value); }}
            />
          </div>
          <div className='app-form-field'>
            <label className='app-form-label' htmlFor='password'>Password</label>
            <FilteredInput
              id='password'
              className='app-form-component'
              style={{ width: '280px' }}
              type='password'
              maxLength={20}
              filter={passwordChars}
              value={password.value}
              onChange={(e) => { onChange (password, e.target.value); }}
            />
          </div>
          <div className='app-form-buttonArea'>
            <button
              className='app-form-button'
              disabled={(username.value === '') || (password.value === '')}
              onClick={(e) => {
                resetFocus ();
                onSubmit (e);
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
