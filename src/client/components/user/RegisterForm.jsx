import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';
import { PageContent } from '../style/Page';
import { Form, Field, FieldInfo, FieldError } from '../style/Form';
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

const RegisterForm = ({ message, fields: { username, password, verifyPassword },
  onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = username.error ? 'username' : password.error ? 'password' :
      verifyPassword ? 'verifyPassword' : 'username';
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
      <Form center w='280px' onSubmit={onSubmit}>
        <Field>
          <label htmlFor='username'>User name</label>
          <FilteredInput
            id='username'
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
          <label htmlFor='password'>Password</label>
          <FilteredInput
            id='password'
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
          <label htmlFor='verify'>Verify Password</label>
          <FilteredInput
            id='verify'
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
          <Button onClick={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
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
