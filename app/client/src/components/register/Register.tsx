import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const navigate = useNavigate ();
  const login = useLogin ();
  const register = useRegister ();

  const onClose = useCallback (() => {
    setDialog (undefined);
  }, [setDialog]);

  const onSubmit = useCallback ((e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Registering ...</GenDialog>);
      const { email, name, password } = getValues () as { email: string, name: string, password: string };
      register.mutate ({ email, name, password }, {
        onSuccess: () => {
          setDialog (<GenDialog>Registered, logging in ...</GenDialog>);
          login.mutate ({ email, password }, {
            onSuccess: () => navigate ('/', { replace: true }),
            onError: () => setDialog (<GenDialog actions={['Close']} onClose={onClose}>Error logging in</GenDialog>),
          });
        },
        onError: () => setDialog (<GenDialog actions={['Close']} onClose={onClose}>Error registering</GenDialog>),
      });
    }
    return errors;
  }, [getValues, login, onClose, register, validateAll]);

  return (
    <>
      <RegisterForm
        fields={{
          email: fields.email,
          name: fields.name,
          password: fields.password,
          verifyPassword: fields.verifyPassword,
        }}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
      />
      {dialog}
    </>
  );
};
