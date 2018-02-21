import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { getFirstError } from '../util/formHelpers';
import { fieldPropTypes } from '../util/formPropTypes';
import { PageContent } from '../style/Page';
import { Form, Field, Label, FieldInfo, FieldError } from '../style/Form';
import { Row } from '../style/Layout';
import { Heading } from '../style/Text';
import { Button } from '../style/Button';
import { MessageText } from '../style/MessageText';

const usernameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;
const passwordErrors = {
  required: 'Is required',
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

const LoginForm = ({ message, fields, fields: { username, password }, onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || username.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <Heading center>Login</Heading>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='300px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <Field>
          <Label htmlFor={username.name} required={username.required}>User name</Label>
          <FilteredInput
            id={username.name}
            type='text'
            autoFocus
            maxLength={20}
            autoCapitalize='none'
            autoCorrect='off'
            filter={usernameChars}
            value={username.value}
            onChange={(e) => { onChange (username, e.target.value); }}
            onBlur={() => { onValidate (username); }}
          />
          {username.error ?
            <FieldError>Is required</FieldError> :
            <FieldInfo>Your user name</FieldInfo>
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
            onBlur={() => { onValidate (password); }}
          />
          {password.error ?
            <FieldError>{passwordErrors[password.error] || 'Error'}</FieldError> :
            <FieldInfo>Your password</FieldInfo>
          }
        </Field>
        <Row center>
          <Button disabled={username.value === ''}>
            Login
          </Button>
        </Row>
      </Form>
    </PageContent>
  );
};

export default LoginForm;

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
