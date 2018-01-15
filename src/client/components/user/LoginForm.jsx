import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';
import { PageContent } from '../style/Page';
import { Form, Field, Row } from '../style/Layout';
import { Heading } from '../style/Text';
import { Button } from '../style/Button';
import { MessageText } from '../style/MessageText';

const usernameChars = /[A-Za-z0-9]/;
const passwordChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

const LoginForm = ({ message, fields: { username, password }, onChange, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
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
      <Form center w='300px' onSubmit={onSubmit}>
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
            filter={usernameChars}
            value={username.value}
            onChange={(e) => { onChange (username, e.target.value); }}
          />
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
          />
        </Field>
        <Row center>
          <Button
            disabled={username.value === ''}
            onClick={(e) => {
              resetFocus ();
              onSubmit (e);
            }}
          >
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
  onSubmit: PropTypes.func.isRequired,
};
