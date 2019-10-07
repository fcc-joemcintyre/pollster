import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FieldInput, Flex, GridBox, GridBoxElement, Text } from 'uikit';
import { fieldPropTypes } from 'use-fields';

export const ManageForm = (
  { action, fields: { title, ...choices }, onChange, onValidate, onSubmit, onDelete }
) => (
  <Box center maxw='400px' p='30px 4px 16px 4px'>
    <Text as='h2' center>
      {action === 'add' ? 'Add a New Poll' : 'Edit Poll'}
    </Text>
    <Box center w='380px' mt='30px'>
      <form
        onSubmit={async (e) => {
          const errors = await onSubmit (e);
          const el = document.getElementById (errors ? errors[0].name : title.name);
          if (el) { el.focus (); }
        }}
      >
        <GridBox>
          <FieldInput
            field={title}
            label='Title'
            span={12}
            maxLength={40}
            info='Poll title'
            onChange={onChange}
            onValidate={onValidate}
          />
          {
            Object.values (choices).map ((a, index) => (
              <FieldInput
                key={a.name}
                field={a}
                label={`Choice ${index + 1}`}
                span={12}
                maxLength={40}
                info='Poll text'
                onChange={onChange}
                onValidate={onValidate}
              />
            ))
          }
          <GridBoxElement span={12}>
            <Flex center gap='6px'>
              <Button type='submit'>
                SAVE
              </Button>
              { (action === 'edit') &&
                <Button type='button' onClick={onDelete}>
                  DELETE
                </Button>
              }
            </Flex>
          </GridBoxElement>
        </GridBox>
      </form>
    </Box>
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
