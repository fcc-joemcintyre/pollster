import React from 'react';
import PropTypes from 'prop-types';
import { getFirstError } from '../../lib/formkit/formHelpers';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { PageContent, Row } from '../../lib/Layout';
import { Form, FormButtonRow } from '../../lib/Form';
import { Field } from '../../lib/FieldBordered';
import { FieldInput, FieldFilteredInput, FieldSelect } from '../../lib/Field';
import { Label } from '../../lib/Label';
import { H1 } from '../../lib/Text';
import { Button } from '../../lib/Button';
import { MessageText } from '../../lib/MessageText';

const nameChars = /[A-Za-z -.,]/;
const emailErrors = {
  format: 'Invalid email address',
};

export const ProfileForm = ({ message, fields, fields: { name, email, theme }, onChange, onValidate, onSubmit }) => {
  function resetFocus () {
    const id = getFirstError (fields) || name.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <PageContent>
      <H1 center>Profile</H1>
      <Row center mb='24px'>
        <MessageText status={message.status}>
          {message.text}
        </MessageText>
      </Row>
      <Form center w='280px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
        <Field>
          <Label htmlFor={name.name} required={name.required}>Name</Label>
          <FieldFilteredInput
            field={name}
            autoFocus
            maxLength={40}
            filter={nameChars}
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <Field>
          <Label htmlFor={email.name} required={email.required}>email</Label>
          <FieldInput
            field={email}
            maxLength={60}
            autoCapitalize='none'
            autoCorrect='off'
            errors={emailErrors}
            onChange={onChange}
            onValidate={onValidate}
          />
        </Field>
        <Field>
          <Label htmlFor={theme.name} required={theme.required}>Theme</Label>
          <FieldSelect
            field={theme}
            onChange={onChange}
          >
            <option key='base' value='base'>Cyan</option>
            <option key='gray' value='gray'>Gray</option>
          </FieldSelect>
        </Field>

        <FormButtonRow>
          <Button tyoe='submit'>
            SAVE
          </Button>
        </FormButtonRow>
      </Form>
    </PageContent>
  );
};

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
