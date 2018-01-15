import React from 'react';
import PropTypes from 'prop-types';
import FilteredInput from '../ui/FilteredInput.jsx';
import { fieldPropTypes } from '../util/formHelpers';
import { PageContent } from '../style/Page';
import { Form, Field, FieldInfo, FieldError, Row } from '../style/Layout';
import { Heading } from '../style/Text';
import { Button } from '../style/Button';
import { MessageText } from '../style/MessageText';

const nameChars = /[A-Za-z -.,]/;

const ProfileForm = ({ message, fields: { name, email }, onChange, onValidate, onSubmit }) => {
  let focusRef;

  function resetFocus () {
    if (focusRef) {
      focusRef.focus ();
    }
  }

  return (
    <PageContent>
      <Heading center>Profile</Heading>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='280px' onSubmit={onSubmit}>
        <Field>
          <label htmlFor='name'>Name</label>
          <FilteredInput
            id='name'
            type='text'
            ref={(ref) => { focusRef = ref; }}
            autoFocus
            maxLength={40}
            filter={nameChars}
            value={name.value}
            onChange={(e) => { onChange (name, e.target.value); }}
            onBlur={() => { onValidate (name); }}
          />
          {
            name.touched && name.error ?
              <FieldError>Max length is 40 characters</FieldError> :
              <FieldInfo>Your full name</FieldInfo>
          }
        </Field>
        <Field>
          <label htmlFor='email'>email</label>
          <input
            id='email'
            type='text'
            maxLength={60}
            autoCapitalize='none'
            autoCorrect='off'
            value={email.value}
            onChange={(e) => { onChange (email, e.target.value); }}
            onBlur={() => { onValidate (email); }}
          />
          {
            email.touched && email.error ?
              <FieldError>Invalid email address</FieldError> :
              <FieldInfo>Your email address</FieldInfo>
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

export default ProfileForm;

ProfileForm.propTypes = {
  message: PropTypes.shape ({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape ({
    name: PropTypes.shape (fieldPropTypes).isRequired,
    email: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
