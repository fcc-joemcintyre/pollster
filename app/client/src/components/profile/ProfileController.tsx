import { useCallback, useMemo } from 'react';
import { createField, useFields } from '@cygns/use-fields';
import { ProfileForm } from './ProfileForm';

type Props = {
  name: string,
  theme: string,
  onSave: (name: string, theme: string) => void,
};

/**
 * Profile form controller
 * @param Props
 * @returns Component
 */
export const ProfileController = ({ name, theme, onSave }: Props) => {
  const initial = useMemo (() => [
    createField ('name', name, true),
    createField ('theme', theme, true),
  ], [name, theme]);
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initial);

  const onSubmit = useCallback ((e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { name: nameValue, theme: themeValue } = getValues () as { name: string, theme: string };
      onSave (nameValue, themeValue);
    }
    return errors;
  }, [getValues, onSave, validateAll]);

  return (
    <ProfileForm
      fields={{
        name: fields.name,
        theme: fields.theme,
      }}
      onChange={onChange}
      onValidate={onValidate}
      onSubmit={onSubmit}
    />
  );
};
