import React, { Fragment, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail } from 'validators';
import { updateProfile } from '../../store/userActions';
import { ProfileForm } from './ProfileForm';

export const ProfilePage = () => {
  const iName = useSelector (state => state.user.name);
  const iEmail = useSelector (state => state.user.email);
  const iTheme = useSelector (state => state.user.theme || 'base');

  const initialFields = useMemo (() => [
    createField ('name', iName, true),
    createField ('email', iEmail, false, [isEmail]),
    createField ('theme', iTheme, false),
  ], [iName, iEmail, iTheme]);

  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [mb, setMB] = useState (null);
  const dispatch = useDispatch ();

  async function onSubmit (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Updating profile ...' });
      try {
        const { name, email, theme } = getValues ();
        await dispatch (updateProfile (name, email, theme));
        setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Profile saved' });
      } catch (err) {
        setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error saving profile' });
      }
    }
    return errors;
  }

  function onCloseModal () {
    setMB (null);
  }

  return (
    <Fragment>
      <ProfileForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
      />
      { mb &&
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onClose={onCloseModal}
        />
      }
    </Fragment>
  );
};
