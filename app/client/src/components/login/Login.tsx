import { useCallback, useState } from 'react';
import { createField, useFields } from '@cygns/use-fields';
import { GenDialog } from '@cygns/muikit';
import { isEmail, isPassword } from '@cygns/validators';
import { useLogin } from '../../data/useAuth';
import { LoginForm } from './LoginForm';

type Props = {
  onLogin: () => void,
  onClose: () => void,
};

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('password', '', true, [isPassword]),
];

/**
 * Login dialog
 * @param Props
 * @returns Component
 */
export const Login = ({ onLogin, onClose }) => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const login = useLogin ();

  const onCloseDialog = useCallback (() => {
    setDialog (undefined);
  }, [setDialog]);

  const onSubmit = useCallback ((e) => {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Logging in</GenDialog>);
      const { email, password } = getValues () as { email: string, password: string };
      login.mutate ({ email, password }, {
        onSuccess: () => onLogin (),
        onError: () => setDialog (
          <GenDialog actions={['Close']} onClose={onCloseDialog}>
            Error logging in
          </GenDialog>
        ),
      });
    }
    return errors;
  }, [getValues, login, onCloseDialog, onLogin, setDialog, validateAll]);

  return (
    <>
      <LoginForm
        fields={{
          email: fields.email,
          password: fields.password,
        }}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
      {dialog}
    </>
  );
};
