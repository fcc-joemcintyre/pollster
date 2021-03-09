import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail, isPassword } from 'validators';
import { login } from '../../store/userActions';
import { LoginForm } from './LoginForm';

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('password', '', true, [isPassword]),
];

export const Login = ({ onLogin, onCancel }) => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [mb, setMB] = useState (null);
  const dispatch = useDispatch ();

  async function onSubmit (e) {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Logging in' });
      try {
        const { email, password } = getValues ();
        await dispatch (login (email, password));
        onLogin ();
      } catch (err) {
        setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Error logging in' });
      }
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
