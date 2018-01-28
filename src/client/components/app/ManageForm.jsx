import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../util/formHelpers';
import { Form, Field, FieldInfo, FieldError, Label } from '../style/Form';
import { Box, Row } from '../style/Layout';
import { SubHeading } from '../style/Text';
import { Button } from '../style/Button';

const ManageForm = ({ action, fields: { title, ...choices }, onChange, onValidate, onSubmit, onDelete }) => (
  <Box center w='400px' pb='16px'>
    <SubHeading center>
      {action === 'add' ? 'Add a New Poll' : 'Edit Poll'}
    </SubHeading>
    <Form center w='380px' mt='30px' onSubmit={onSubmit}>
      <Field>
        <Label htmlFor='title' required={title.required}>Title</Label>
        <input
          id='title'
          type='text'
          maxLength={40}
          value={title.value}
          onChange={(e) => { onChange (title, e.target.value); }}
          onBlur={() => { onValidate (title); }}
        />
        { title.error ?
          <FieldError>Is required</FieldError> :
          <FieldInfo>Title poll will be shown under</FieldInfo>
        }
      </Field>

      {
        Object.values (choices).map ((a, index) => {
          const name = `Choice ${index + 1}`;
          return (
            <Field key={name}>
              <Label htmlFor={name} required={a.required}>{name}</Label>
              <input
                id={name}
                type='text'
                maxLength={40}
                value={a.value}
                onChange={(e) => { onChange (a, e.target.value); }}
                onBlur={() => { onValidate (a); }}
              />
              { a.error ?
                <FieldError>Is required</FieldError> :
                <FieldInfo>Poll text for this choice</FieldInfo>
              }
            </Field>
          );
        })
      }
      <Row center>
        <Button type='submit'>
          SAVE
        </Button>
        { (action === 'edit') &&
          <Button type='button' onClick={onDelete}>
            DELETE
          </Button>
        }
      </Row>
    </Form>
  </Box>
);

export default ManageForm;

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
