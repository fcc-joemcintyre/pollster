import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { PageContent, Row } from '../../lib/Layout';
import { Form, FormButtonRow } from '../../lib/Form';
import { Field } from '../../lib/FieldBordered';
import { FieldFilteredInput } from '../../lib/Field';
import { Label } from '../../lib/Label';
import { H1 } from '../../lib/Text';
import { Button } from '../../lib/Button';
import { MessageText } from '../../lib/MessageText';

const usernameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;
const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = ({ message, fields: { username, password }, onChange, onValidate, onSubmit }) => (
  <PageContent>
    <H1 center>Login</H1>
    <Row center mb='24px'>
      <MessageText status={message.status}>
        {message.text}
      </MessageText>
    </Row>
    <Form
      center
      w='300px'
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : username.name);
        if (el) { el.focus (); }
      }}
    >
      <Field>
        <Label htmlFor={username.name} required={username.required}>User name</Label>
        <FieldFilteredInput
          field={username}
          autoFocus
          maxLength={20}
          autoCapitalize='none'
          autoCorrect='off'
          filter={usernameChars}
          onChange={onChange}
          onValidate={onValidate}
        />
      </Field>
      <Field>
        <Label htmlFor={password.name} required={password.required}>Password</Label>
        <FieldFilteredInput
          field={password}
          type='password'
          maxLength={20}
          filter={passwordChars}
          errors={passwordErrors}
          onChange={onChange}
          onValidate={onValidate}
        />
      </Field>

      <FormButtonRow>
        <Button type='submit'>
          LOGIN
        </Button>
      </FormButtonRow>
    </Form>
  </PageContent>
);

LoginForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
