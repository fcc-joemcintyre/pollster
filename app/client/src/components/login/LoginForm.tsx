import { Grid } from '@mui/material';
import { FieldTextInput, GenDialog } from '@cygns/muikit';
import { Field, FieldError } from '@cygns/use-fields';

type Props = {
  fields: {
    email: Field,
    password: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => FieldError[] | null,
  onCancel: () => void,
}

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

/**
 * Modal login form
 * @param Props
 * @returns Component
 */
export const LoginForm = (
  { fields: { email, password }, onChange, onValidate, onSubmit, onCancel }: Props
) => (
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
