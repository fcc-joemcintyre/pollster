// @ts-check
import { Grid } from '@mui/material';
import { FieldTextInput, GenDialog } from '@cygns/muikit';

/**
  @typedef { import ('@cygns/use-fields').Field} Field

  @typedef {Object} Props
  @property {Object} fields
  @property {Field} fields.email
  @property {Field} fields.password
  @property {React.ChangeEventHandler} onChange
  @property {React.FocusEventHandler} onValidate
  @property {function} onSubmit
  @property {function} onCancel
*/

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

/**
 * Modal login form
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
export const LoginForm = ({ fields: { email, password }, onChange, onValidate, onSubmit, onCancel }) => (
  <GenDialog
    formid='login-form'
    title='Login'
    actions={['Login', 'Cancel']}
    defaultAction='Login'
    closeAction='Cancel'
    onClose={onCancel}
  >
    <form
      id='login-form'
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : email.name);
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2} width='300px' p='10px 10px 20px 10px' m='0 auto'>
        <FieldTextInput
          field={email}
          label='Email'
          autoCapitalize='none'
          autoCorrect='off'
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          type='password'
          field={password}
          label='Password'
          maxLength={20}
          info='Your password'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
      </Grid>
    </form>
  </GenDialog>
);
