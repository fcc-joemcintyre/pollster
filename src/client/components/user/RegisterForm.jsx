import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';
import { PageContent } from '../style/Page';
import { Form, Field, FieldInfo, FieldError, Row } from '../style/Layout';
import { Heading } from '../style/Text';
import { Button } from '../style/Button';
import { MessageText } from '../style/MessageText';

const nameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

const RegisterForm = ({ message, fields: { username, password, verifyPassword },
  onChange, onValidate, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
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
            ref={(ref) => { focusRef = ref; }}
            autoFocus
            maxLength={20}
            autoCapitalize='none'
            autoCorrect='off'
            filter={nameChars}
            value={username.value}
            onChange={(e) => { onChange (username, e.target.value); }}
            onBlur={() => { onValidate (username); }}
          />
          {
            username.touched && username.error ?
              <FieldError>{username.error}</FieldError> :
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
          {
            password.touched && password.error ?
              <FieldError>{password.error}</FieldError> :
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
          {
            verifyPassword.touched && verifyPassword.error ?
              <FieldError>{verifyPassword.error}</FieldError> :
              <FieldInfo>Verify your password</FieldInfo>
          }
        </Field>
        <Row center>
          <Button
            onClick={(e) => {
              resetFocus ();
              onSubmit (e);
            }}
          >
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
