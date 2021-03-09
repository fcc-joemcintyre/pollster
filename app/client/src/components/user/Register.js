import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail, isPassword } from 'validators';
import { register, login } from '../../store/userActions';
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

export const Register = () => {
  const initialFields = useMemo (() => [
    createField ('email', '', true, [isEmail]),
    createField ('name', '', true),
    createField ('password', '', true, [isPassword, isPasswordChars]),
    createField ('verifyPassword', '', true, [isPassword, isPasswordChars]),
  ], []);

  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields, [isMatch]);
  const [mb, setMB] = useState (null);
  const history = useHistory ();
  const dispatch = useDispatch ();

  async function onSubmit (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Registering ...' });
      try {
        const { email, name, password } = getValues ();
        await dispatch (register (email, name, password));
        try {
          setMB ({ content: 'Registered, logging in ...' });
          await dispatch (login (email, password));
          history.replace ('/');
        } catch (err) {
          setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error logging in' });
        }
      } catch (err) {
        setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error registering' });
      }
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
