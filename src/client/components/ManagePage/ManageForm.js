import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { Form, FormButtonRow } from '../../lib/Form';
import { Field } from '../../lib/FieldBordered';
import { FieldInput } from '../../lib/Field';
import { Label } from '../../lib/Label';
import { Box } from '../../lib/Layout';
import { H2 } from '../../lib/Text';
import { Button } from '../../lib/Button';

export const ManageForm = (
  { action, fields: { title, ...choices }, onChange, onValidate, onSubmit, onDelete }
) => (
  <Box center maxw='400px' p='30px 4px 16px 4px'>
    <H2 center>
      {action === 'add' ? 'Add a New Poll' : 'Edit Poll'}
    </H2>
    <Form
      center
      w='380px'
      mt='30px'
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : title.name);
        if (el) { el.focus (); }
      }}
    >
      <Field>
        <Label htmlFor={title.name} required={title.required}>Title</Label>
        <FieldInput
          field={title}
          maxLength={40}
          onChange={onChange}
          onValidate={onValidate}
        />
      </Field>
      {
        Object.values (choices).map ((a, index) => (
          <Field key={a.name}>
            <Label htmlFor={a.name} required={a.required}>{`Choice ${index + 1}`}</Label>
            <FieldInput
              field={a}
              maxLength={40}
              onChange={onChange}
              onValidate={onValidate}
            />
          </Field>
        ))
      }

      <FormButtonRow>
        <Button type='submit'>
          SAVE
        </Button>
        { (action === 'edit') &&
          <Button type='button' onClick={onDelete}>
            DELETE
          </Button>
        }
      </FormButtonRow>
    </Form>
  </Box>
);

ManageForm.propTypes = {
  action: PropTypes.string.isRequired,
  fields: PropTypes.shape ({
    title: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
