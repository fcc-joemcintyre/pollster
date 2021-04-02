// @ts-check
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createField, useFields } from '@cygns/use-fields';
import { GenDialog } from '@cygns/muikit';
import { isEmail, isPassword } from '@cygns/validators';
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
  const [dialog, setDialog] = useState (/** @type {GenDialog=} */ (undefined));
  const history = useHistory ();
  const login = useLogin ();
  const register = useRegister ();

  function onSubmit (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Registering ...</GenDialog>);
      const { email, name, password } = getValues ();
      register.mutate ({ email, name, password }, {
        onSuccess: () => {
          setDialog (<GenDialog>Registered, logging in ...</GenDialog>);
          login.mutate ({ email, password }, {
            onSuccess: () => history.replace ('/'),
            onError: () => setDialog (<GenDialog actions={['Close']} onClose={onClose}>Error logging in</GenDialog>),
          });
        },
        onError: () => setDialog (<GenDialog actions={['Close']} onClose={onClose}>Error registering</GenDialog>),
      });
    }
    return errors;
  }

  function onClose () {
    setDialog (null);
  }

  return (
    <>
      <RegisterForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
      />
      {dialog}
    </>
  );
};
