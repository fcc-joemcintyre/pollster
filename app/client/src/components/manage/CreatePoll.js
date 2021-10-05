// @ts-check
import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { GenDialog } from '@cygns/muikit';
import { createField, useFields } from '@cygns/use-fields';
import { useCreatePoll } from '../../data/usePolls';
import { PageContent } from '../util';
import { PollForm } from './PollForm';

const initialFields = [
  createField ('title', '', true),
  createField ('choice0', '', true),
  createField ('choice1', '', true),
];

export const CreatePoll = () => {
  const { fields, onChange, onValidate, getValues, validateAll, addField } =
    useFields (initialFields);
  const [dialog, setDialog] = useState (/** @type {GenDialog=} */ (undefined));
  const createPoll = useCreatePoll ();

  const onClose = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const onSubmitPoll = useCallback ((e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Creating new poll...</GenDialog>);
      const { title, ...rest } = getValues ();
      const choices = Object.values (rest).filter ((a) => (a !== ''));
      createPoll.mutate ({ title, choices }, {
        onSuccess: () => {
          setDialog (
            <GenDialog
              actions={['Ok']}
              data='reset'
              onClose={onClose}
            >
              New poll has been created.
            </GenDialog>
          );
        },
        onError: () => {
          setDialog (
            <GenDialog
              actions={['Close']}
              onClose={onClose}
            >
              Error creating new poll.
            </GenDialog>
          );
        },
      });
    }
    return errors;
  }, [createPoll, getValues, onClose, validateAll]);

  // determine if all choice fields have content
  const { title, ...rest } = getValues ();
  if (rest) {
    const values = Object.values (rest);
    const anyEmpty = values.reduce ((acc, a) => acc || (a === ''), false);
    // if all choice fields have content, add another choice field
    if (!anyEmpty) {
      const next = `choice${values.length}`;
      addField (createField (next, '', false));
    }
  }

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center' gutterBottom>
        Create a Poll
      </Typography>
      <PollForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmitPoll}
      />
      {dialog}
    </PageContent>
  );
};
