import React from 'react';
import PropTypes from 'prop-types';
import { getFirstError } from '../../lib/formkit/formHelpers';
import { fieldPropTypes } from '../../lib/formkit/formPropTypes';
import { Form } from '../../lib/Form';
import { Field, FieldInput } from '../../lib/FieldBordered';
import { Label } from '../../lib/Label';
import { Box, FlexGroup } from '../../lib/Layout';
import { SubHeading } from '../../lib/Text';
import { Button } from '../../lib/Button';

export const ManageForm = (
  { action, fields, fields: { title, ...choices }, onChange, onValidate, onSubmit, onDelete }
) => {
  function resetFocus () {
    const id = getFirstError (fields) || title.name;
    const el = document.getElementById (id);
    if (el) {
      el.focus ();
    }
  }

  return (
    <Box center mw='400px' p='0 4px 16px 4px'>
      <SubHeading center>
        {action === 'add' ? 'Add a New Poll' : 'Edit Poll'}
      </SubHeading>
      <Form center w='380px' mt='30px' onSubmit={(e) => { onSubmit (e).then (() => { resetFocus (); }); }}>
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
        <FlexGroup center>
          <Button type='submit'>
            SAVE
          </Button>
          { (action === 'edit') &&
            <Button type='button' onClick={onDelete}>
              DELETE
            </Button>
          }
        </FlexGroup>
      </Form>
    </Box>
  );
};

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
