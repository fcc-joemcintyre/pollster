import { Box, Button, Grid } from '@mui/material';
import { FieldTextInput } from '@cygns/muikit';
import { Field, FieldError } from '@cygns/use-fields';

type Props = {
  fields: { [name: string]: Field },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => FieldError[] | null,
};

/**
 * Poll editing form
 * @param Props
 * @returns Component
 */
export const PollForm = ({
  fields, onChange, onValidate, onSubmit,
}: Props) => (
  <Box maxWidth='400px' m='0 auto' p='1rem 4px 1rem 4px'>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : 'title');
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2}>
        <FieldTextInput
          field={fields.title}
          label='Title'
          maxLength={40}
          info='Poll title'
          onChange={onChange}
          onValidate={onValidate}
        />
        {
          Object.entries (fields).filter ((a) => a[0] !== 'title').map ((a, index) => (
            <FieldTextInput
              key={a[1].name}
              field={a[1]}
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
