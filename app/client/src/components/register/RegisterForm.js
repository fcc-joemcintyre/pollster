import PropTypes from 'prop-types';
import { Button, FieldInput, Flex, GridBox, GridBoxElement, PageContent, Text } from 'uikit';
import { fieldPropTypes } from 'use-fields';

const emailErrors = {
  format: 'Invalid email address',
};
const passwordErrors = {
  format: 'Must be A-Z, a-z, 0-9, !@#$%^&*()_+=',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({
  fields: { email, name, password, verifyPassword },
  onChange, onValidate, onSubmit,
}) => (
  <PageContent>
    <Text as='h1' center>Register</Text>
    <form
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : name.name);
        if (el) { el.focus (); }
      }}
    >
      <GridBox mb='20px' w='300px' center>
        <FieldInput
          field={email}
          label='Email'
          autoFocus
          maxLength={20}
          autoCapitalize='none'
          autoCorrect='off'
          errors={emailErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldInput
          field={name}
          label='Name'
          maxLength={40}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldInput
          field={password}
          label='Password'
          type='password'
          maxLength={20}
          info='4 to 20 characters'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldInput
          field={verifyPassword}
          label='Verify Password'
          type='password'
          maxLength={20}
          info='Re-type your password'
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />

        <GridBoxElement span={12} center>
          <Flex gap='6px'>
            <Button type='submit'>
              REGISTER
            </Button>
          </Flex>
        </GridBoxElement>
      </GridBox>
    </form>
  </PageContent>
);

RegisterForm.propTypes = {
  fields: PropTypes.shape ({
    email: PropTypes.shape (fieldPropTypes).isRequired,
    name: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
    verifyPassword: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
