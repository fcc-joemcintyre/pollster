// @ts-check
import { Box, Button, Grid } from '@material-ui/core';
import { FieldTextInput } from '@cygns/muikit';

/**
  @typedef {import ('@cygns/use-fields').Field} Field

  @typedef {Object} Props
  @property {Object} fields
  @property {Field} fields.title
  @property {Field[]} fields.choices
  @property {React.ChangeEventHandler} onChange
  @property {React.FocusEventHandler} onValidate
  @property {Function} onSubmit
*/

/**
 * Poll editing form
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
export const PollForm = ({
  fields: { title, ...choices },
  onChange, onValidate, onSubmit,
}) => (
  <Box maxWidth='400px' m='0 auto' p='1rem 4px 1rem 4px'>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : title.name);
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2}>
        <FieldTextInput
          field={title}
          label='Title'
          maxLength={40}
          info='Poll title'
          onChange={onChange}
          onValidate={onValidate}
        />
        {
          Object.values (choices).map ((a, index) => (
            <FieldTextInput
              key={a.name}
              field={a}
              label={`Choice ${index + 1}`}
              maxLength={40}
              info='Poll text'
              onChange={onChange}
              onValidate={onValidate}
            />
          ))
        }
        <Grid item>
          <Button type='submit' variant='contained'>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </form>
  </Box>
);
