import { useCallback, useState } from 'react';
import { GenDialog } from '@cygns/muikit';
import { createField, Field, useFields } from '@cygns/use-fields';
import { PollChoice, useUpdatePoll } from '../../data/usePolls';
import { PollForm } from './PollForm';
import { ConstructionOutlined } from '@mui/icons-material';

type Props = {
  pollKey: number,
  initial: Field[],
};

/**
 * Field management for updating poll
 * @param Props
 * @returns Component
 */
export const UpdatePollController = ({ pollKey, initial }: Props) => {
  const { fields, onChange, onValidate, getValues, validateAll, addField } =
    useFields (initial);
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const updatePoll = useUpdatePoll ();

  const onClose = useCallback (() => {
    setDialog (undefined);
  }, [setDialog]);

  const onSubmitPoll = useCallback ((e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Updating poll...</GenDialog>);
      const { title, ...rest } = getValues () as { title: string };
      const choices = Object.values (rest).filter ((a) => (a !== '')) as string[];
      updatePoll.mutate ({ key: pollKey, title, choices }, {
        onSuccess: () => {
          setDialog (
            <GenDialog
              actions={['Ok']}
              data='reset'
              onClose={onClose}
            >
              Poll has been updated.
            </GenDialog>
          );
        },
        onError: () => {
          setDialog (
            <GenDialog
              actions={['Close']}
              onClose={onClose}
            >
              Error updating poll.
            </GenDialog>
          );
        },
      });
    }
    return errors;
  }, [getValues, onClose, pollKey, updatePoll, validateAll]);

  // determine if all choice fields have content
  const { title, ...choices } = getValues ();
  if (choices) {
    const values = Object.values (choices);
    const anyEmpty = values.reduce ((acc, a) => acc || (a === ''), false);
    // if all choice fields have content, add another choice field
    if (!anyEmpty) {
      const next = `choice${values.length}`;
      addField (createField (next, '', false));
    }
  }

  return (
    <>
      <PollForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmitPoll}
      />
      {dialog}
    </>
  );
};
