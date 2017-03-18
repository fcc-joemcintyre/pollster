import React, { PropTypes } from 'react';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';

const usernameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

const LoginForm = ({ message, username, password, onChange, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
    }
  }

  return (
    <div className='dialogUser'>
      <h2>Login</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <div className={`app-form-status-${message.status}`}>
          {message.text}
        </div>
        <FilteredInput
          autoFocus
          type='text'
          ref={(ref) => { focusRef = ref; }}
          placeholder='user name'
          maxLength={20}
          autoCapitalize='none'
          autoCorrect='off'
          filter={usernameChars}
          value={username.value}
          onChange={(e) => { onChange (username, e.target.value); }}
        />
        <FilteredInput
          type='password'
          placeholder='password'
          maxLength={20}
          filter={passwordChars}
          value={password.value}
          onChange={(e) => { onChange (password, e.target.value); }}
        />
        <button
          className='dialogButton'
          disabled={(username.value === '') || (password.value === '')}
          onClick={(e) => {
            resetFocus ();
            onSubmit (e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.shape (fieldPropTypes).isRequired,
  password: PropTypes.shape (fieldPropTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
