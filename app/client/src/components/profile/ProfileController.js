// @ts-check
import { useMemo } from 'react';
import { createField, useFields } from '@cygns/use-fields';
import { ProfileForm } from './ProfileForm';

/**
  @typedef {Object} Props
  @property {string} name
  @property {string} theme
  @property {function} onSave
*/

/**
 * Profile form controller
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
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
