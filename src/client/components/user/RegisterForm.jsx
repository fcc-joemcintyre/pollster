import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { getFirstError, fieldPropTypes } from '../util/formHelpers';
import { PageContent } from '../style/Page';
import { Form, Field, Label, FieldInfo, FieldError } from '../style/Form';
import { Row } from '../style/Layout';
import { Heading } from '../style/Text';
import { Button } from '../style/Button';
import { MessageText } from '../style/MessageText';

const nameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;
const errors = {
  required: 'Is required',
  format: 'Invalid password',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

const RegisterForm = ({ message, fields, fields: { username, password, verifyPassword },
  onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || username.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <Heading center>Register</Heading>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='280px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <Field>
          <Label htmlFor={username.name} required={username.required}>User name</Label>
          <FilteredInput
            id={username.name}
            type='text'
            autoFocus
            maxLength={20}
            autoCapitalize='none'
            autoCorrect='off'
            filter={nameChars}
            value={username.value}
            onChange={(e) => { onChange (username, e.target.value); }}
            onBlur={() => { onValidate (username); }}
          />
          { username.error ?
            <FieldError>Is required</FieldError> :
            <FieldInfo>Up to 20 letters/digits, no spaces</FieldInfo>
          }
        </Field>
        <Field>
          <Label htmlFor={password.name} required={password.required}>Password</Label>
          <FilteredInput
            id={password.name}
            type='password'
            maxLength={20}
            filter={passwordChars}
            value={password.value}
            onChange={(e) => { onChange (password, e.target.value); }}
            onBlur={() => { onValidate (password); onValidate (verifyPassword); }}
          />
          { password.error ?
            <FieldError>{errors[password.error] || 'Error'}</FieldError> :
            <FieldInfo>Your password</FieldInfo>
          }
        </Field>
        <Field>
          <Label htmlFor={verifyPassword.name} required={verifyPassword.required}>Verify Password</Label>
          <FilteredInput
            id={verifyPassword.name}
            type='password'
            maxLength={20}
            filter={passwordChars}
            value={verifyPassword.value}
            onChange={(e) => { onChange (verifyPassword, e.target.value); }}
            onBlur={() => { onValidate (verifyPassword); onValidate (password); }}
          />
          { verifyPassword.error ?
            <FieldError>{errors[verifyPassword.error] || 'Error'}</FieldError> :
            <FieldInfo>Verify your password</FieldInfo>
          }
        </Field>
        <Row center>
          <Button>
            Save
          </Button>
        </Row>
      </Form>
    </PageContent>
  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
    verifyPassword: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
