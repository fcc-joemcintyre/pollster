import { useState } from 'react';
import { MessageBox } from 'uikit';
import { useProfile, useUpdateProfile } from '../../data/useProfile';
import { ProfileController } from './ProfileController';

export const Profile = () => {
  const query = useProfile ();
  const updateProfile = useUpdateProfile ();
  const [mb, setMB] = useState (null);

  let message;
  if (query.isLoading) {
    message = 'Loading';
  }
  if (query.isError) {
    message = 'Error loading profile';
  }
  if (message) {
    return <span>{message}</span>;
  }

  function onSave (name, theme) {
    setMB ({ content: 'Updating profile ...' });
    updateProfile.mutate ({ name, theme }, {
      onSuccess: () => setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Profile saved' }),
      onError: () => setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error saving profile' }),
    });
  }

  function onCloseModal () {
    setMB (null);
  }

  return (
    <>
      <ProfileController
        name={query.data.name}
        theme={query.data.theme}
        onSave={onSave}
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
