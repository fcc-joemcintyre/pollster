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

const nameChars = /[A-Za-z -.,]/;
const emailErrors = {
  required: 'Is required',
  format: 'Invalid email address',
};

const ProfileForm = ({ message, fields, fields: { name, email, theme }, onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || name.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
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
      <Form center w='280px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <Field>
          <Label htmlFor={name.name} required={name.required}>Name</Label>
          <FilteredInput
            id={name.name}
            type='text'
            autoFocus
            maxLength={40}
            filter={nameChars}
            value={name.value}
            onChange={(e) => { onChange (name, e.target.value); }}
            onBlur={() => { onValidate (name); }}
          />
          {
            name.error ?
              <FieldError>Is required</FieldError> :
              <FieldInfo>Your full name</FieldInfo>
          }
        </Field>
        <Field>
          <Label htmlFor={email.name} required={email.required}>email</Label>
          <input
            id={email.name}
            type='text'
            maxLength={60}
            autoCapitalize='none'
            autoCorrect='off'
            value={email.value}
            onChange={(e) => { onChange (email, e.target.value); }}
            onBlur={() => { onValidate (email); }}
          />
          {
            email.error ?
              <FieldError>{emailErrors[email.error] || 'Error'}</FieldError> :
              <FieldInfo>Your email address</FieldInfo>
          }
        </Field>
        <Field>
          <Label htmlFor={theme.name} required={theme.required}>Theme</Label>
          <select
            id={theme.name}
            value={theme.value}
            onChange={(e) => { onChange (theme, e.target.value); }}
          >
            <option key='base' value='base'>Cyan</option>
            <option key='gray' value='gray'>Gray</option>
          </select>
          <FieldInfo>Select a theme you like</FieldInfo>
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
