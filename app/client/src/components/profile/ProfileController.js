import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createField, useFields } from 'use-fields';
import { ProfileForm } from './ProfileForm';

export const ProfileController = ({ name, theme, onSave }) => {
  const initial = useMemo (() => [
    createField ('name', name, true),
    createField ('theme', theme, true),
  ], [name, theme]);
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initial);

  function onSubmit (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      // eslint-disable-next-line no-shadow
      const { name, theme } = getValues ();
      onSave (name, theme);
    }
    return errors;
  }

  return (
    <ProfileForm
      fields={fields}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};

ProfileController.propTypes = {
  name: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};
