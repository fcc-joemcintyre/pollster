// @ts-check
import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { GenDialog } from '@cygns/muikit';
import { useProfile, useUpdateProfile } from '../../data/useProfile';
import { PageContent } from '../util';
import { ProfileController } from './ProfileController';

export const Profile = () => {
  const { data: profile, isLoading, isError } = useProfile ();
  const updateProfile = useUpdateProfile ();
  const [dialog, setDialog] = useState (/** @type {GenDialog=} */ (undefined));

  const onClose = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const onSave = useCallback ((name, theme) => {
    setDialog (<GenDialog>Updating profile ...</GenDialog>);
    updateProfile.mutate ({ name, theme }, {
      onSuccess: () => setDialog (
        <GenDialog actions={['Ok']} onClose={onClose}>Profile saved</GenDialog>
      ),
      onError: () => setDialog (
        <GenDialog actions={['Close']} onClose={onClose}>Error saving profile</GenDialog>
      ),
    });
  }, [onClose, updateProfile]);

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center' gutterBottom>
        Profile
      </Typography>
      { isLoading ? (
        <Typography>Loading...</Typography>
      ) : (isError || !profile) ? (
        <Typography>Error loading your profile</Typography>
      ) : (
        <ProfileController
          name={profile.name}
          theme={profile.theme}
          onSave={onSave}
        />
      )}
      {dialog}
    </PageContent>
  );
};
