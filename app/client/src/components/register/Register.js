import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail, isPassword } from 'validators';
import { useLogin, useRegister } from '../../data/useAuth';
import { RegisterForm } from './RegisterForm';

function isPasswordChars (value) {
  const passwordChars = /^[A-Za-z0-9!@#$%^&*-+_=]+$/;
  return passwordChars.test (value) ? null : 'format';
}

function isMatch (value, fields) {
  const error = fields.password.value !== fields.verifyPassword.value ? 'matching' : null;
  const result = [
    { name: fields.password.name, error },
    { name: fields.verifyPassword.name, error },
  ];
  return result;
}

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('name', '', true),
  createField ('password', '', true, [isPassword, isPasswordChars]),
  createField ('verifyPassword', '', true, [isPassword, isPasswordChars]),
];

export const Register = () => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields, [isMatch]);
  const [mb, setMB] = useState (null);
  const history = useHistory ();
  const login = useLogin ();
  const register = useRegister ();

  function onSubmit (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Registering ...' });
      const { email, name, password } = getValues ();
      register.mutate ({ email, name, password }, {
        onSuccess: () => {
          setMB ({ content: 'Registered, logging in ...' });
          login.mutate ({ email, password }, {
            onSuccess: () => history.replace ('/'),
            onError: () => setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error logging in' }),
          });
        },
        onError: () => setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error registering' }),
      });
    }
    return errors;
  }

  function onCloseModal () {
    setMB (null);
  }

  return (
    <>
      <RegisterForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
      />
      { mb && (
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
