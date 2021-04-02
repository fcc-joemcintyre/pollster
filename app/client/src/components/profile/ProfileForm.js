// @ts-check
import { Button, Grid, MenuItem } from '@material-ui/core';
import { FieldTextInput, FieldSelect } from '@cygns/muikit';

/**
  @typedef { import ('@cygns/use-fields').Field} Field

  @typedef {Object} Props
  @property {Object} fields
  @property {Field} fields.name
  @property {Field} fields.theme
  @property {React.ChangeEventHandler} onChange
  @property {React.FocusEventHandler} onValidate
  @property {function} onSubmit
*/

/**
 * Profile
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
export const ProfileForm = ({ fields: { name, theme }, onChange, onValidate, onSubmit }) => (
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
