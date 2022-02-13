import { Button, Grid, MenuItem } from '@mui/material';
import { FieldTextInput, FieldSelect } from '@cygns/muikit';
import { Field, FieldError } from '@cygns/use-fields';

type Props = {
  fields: {
    name: Field,
    theme: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => FieldError[] | null,
};

/**
 * Profile
 * @param Props
 * @returns Component
 */
export const ProfileForm = (
  { fields: { name, theme }, onChange, onValidate, onSubmit }: Props
) => (
  <form
    noValidate
    onSubmit={async (e) => {
      const errors = await onSubmit (e);
      const el = document.getElementById (errors ? errors[0].name : name.name);
      if (el) { el.focus (); }
    }}
  >
    <Grid container width='300px' m='0 auto' spacing={2}>
      <FieldTextInput
        field={name}
        label='Name'
        autoFocus
        maxLength={40}
        info='Your name'
        onChange={onChange}
        onValidate={onValidate}
      />
      <FieldSelect
        field={theme}
        label='Theme'
        info='Select light or dark theme'
        onChange={onChange}
      >
        <MenuItem key='light' value='light'>Light</MenuItem>
        <MenuItem key='dark' value='dark'>Dark</MenuItem>
      </FieldSelect>

      <Grid item>
        <Button type='submit' variant='contained'>
          SAVE
        </Button>
      </Grid>
    </Grid>
  </form>
);
