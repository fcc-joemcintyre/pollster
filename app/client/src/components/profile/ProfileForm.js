import PropTypes from 'prop-types';
import { Button, FieldInput, FieldSelect, GridBox, GridBoxElement, PageContent, Text } from 'uikit';
import { fieldPropTypes } from 'use-fields';

export const ProfileForm = ({ fields: { name, theme }, onChange, onValidate, onSubmit }) => (
  <PageContent>
    <Text as='h1' center>Profile</Text>
    <form
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : name.name);
        if (el) { el.focus (); }
      }}
    >
      <GridBox w='300px' center>
        <FieldInput
          field={name}
          label='Name'
          autoFocus
          maxLength={40}
          info='Your name'
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldSelect
          field={theme}
          label='Theme'
          info='Pick a theme you like'
          onChange={onChange}
        >
          <option key='light' value='light'>Light</option>
          <option key='dark' value='dark'>Dark</option>
        </FieldSelect>

        <GridBoxElement span={12} center>
          <Button type='submit'>
            SAVE
          </Button>
        </GridBoxElement>
      </GridBox>
    </form>
  </PageContent>
);

ProfileForm.propTypes = {
  fields: PropTypes.shape ({
    name: PropTypes.shape (fieldPropTypes).isRequired,
    theme: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
