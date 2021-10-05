// @ts-check
import { useCallback, useState } from 'react';
import { GenDialog } from '@cygns/muikit';
import { createField, useFields } from '@cygns/use-fields';
import { useUpdatePoll } from '../../data/usePolls';
import { PollForm } from './PollForm';

/**
  @typedef {Object} Props
  @property {number} pollKey
  @property {Object<string, any>[]} initial
*/

/**
 * Field management for updating poll
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
export const UpdatePollController = ({ pollKey, initial }) => {
  const { fields, onChange, onValidate, getValues, validateAll, addField } =
    useFields (initial);
  const [dialog, setDialog] = useState (/** @type {GenDialog=} */ (undefined));
  const updatePoll = useUpdatePoll ();

  const onClose = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const onSubmitPoll = useCallback ((e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setDialog (<GenDialog>Updating poll...</GenDialog>);
      const { title, ...rest } = getValues ();
      const choices = Object.values (rest).filter ((a) => (a !== ''));
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
