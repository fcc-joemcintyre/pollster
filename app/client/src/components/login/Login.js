import { useState } from 'react';
import PropTypes from 'prop-types';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail, isPassword } from 'validators';
import { useLogin } from '../../data/useAuth';
import { LoginForm } from './LoginForm';

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('password', '', true, [isPassword]),
];

export const Login = ({ onLogin, onCancel }) => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [mb, setMB] = useState (null);
  const login = useLogin ();

  function onSubmit (e) {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Logging in' });
      const { email, password } = getValues ();
      login.mutate ({ email, password }, {
        onSuccess: () => onLogin (),
        onError: setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Error logging in' }),
      });
    }
    return errors;
  }

  function onCloseModal () {
    setMB (null);
  }

  return (
    <>
      <LoginForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
      { mb && (
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
