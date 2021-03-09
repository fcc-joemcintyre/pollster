import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createField, useFields } from 'use-fields';
import { Box, MessageBox, PageContent, Text } from 'uikit';
import { addPoll, updatePoll, deletePoll } from '../../store/pollsActions';
import { ManagePollSelect } from './ManagePollSelect';
import { ManageForm } from './ManageForm';

const initialFields = [
  createField ('title', '', true),
  createField ('choice0', '', true),
  createField ('choice1', '', true),
];

export const Manage = () => {
  const { fields, onChange, onValidate, setFields, getValues, validateAll, addField } =
    useFields (initialFields);
  const [selected, setSelected] = useState (0);
  const [mb, setMB] = useState (null);
  const dispatch = useDispatch ();
  const polls = useSelector ((state) => state.polls.filter ((poll) => (poll.creator === state.user.key)));

  function onResetPoll () {
    setSelected (0);
    setFields (initialFields);
  }

  function onSelectPoll (key) {
    if (key === 0) {
      onResetPoll ();
    } else {
      const poll = polls.find ((a) => (a.key === key));
      const choices = poll.choices.map ((a, index) => createField (`choice${index}`, a.text, false));
      setFields ([
        createField ('title', poll.title, true),
        ...choices,
        createField (`choice${poll.choices.length}`, '', false),
      ]);
      setSelected (key);
    }
  }

  async function onSubmitPoll (e) {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      try {
        setMB ({ content: 'Submitting poll...' });
        const { title, ...rest } = getValues ();
        const choices = Object.values (rest).filter ((a) => (a !== ''));
        if (selected === '') {
          await dispatch (addPoll (title, choices));
          const content = 'New poll has been added.';
          setMB ({ content, actions: ['OK'], closeAction: 'OK', data: 'reset' });
        } else {
          await dispatch (updatePoll (selected, title, choices));
          const content = 'Poll has been updated.';
          setMB ({ content, actions: ['OK'], closeAction: 'OK', data: 'reset' });
        }
      } catch (err) {
        const content = 'Error submitting poll, try again.';
        setMB ({ title: 'Error', content, actions: ['Close'], closeAction: 'Close' });
      }
    }
    return errors;
  }

  async function onDeletePoll () {
    try {
      setMB ({ content: 'Deleting poll...' });
      await dispatch (deletePoll (selected));
      setMB ({ content: 'Poll deleted', actions: ['OK'], closeAction: 'OK', data: 'reset' });
    } catch (err) {
      const content = 'Error deleting poll, refresh and try again.';
      setMB ({ title: 'Error', content, actions: ['Close'], closeAction: 'Close' });
    }
  }

  function onCloseModal (action, data) {
    setMB (null);
    if (data === 'reset') {
      onResetPoll ();
    }
  }

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
      <Text as='h1' center>Manage Polls</Text>
      <Box center>
        <ManagePollSelect
          polls={polls}
          selected={selected}
          onSelect={onSelectPoll}
        />
      </Box>
      <Box center>
        <ManageForm
          action={selected === '' ? 'add' : 'edit'}
          fields={fields}
          onChange={onChange}
          onValidate={onValidate}
          onSubmit={onSubmitPoll}
          onDelete={onDeletePoll}
        />
      </Box>
      { mb && (
        <MessageBox
          title={mb.title}
          actions={mb.actions}
          closeAction={mb.closeAction}
          data={mb.data}
          content={mb.content}
          onClose={onCloseModal}
        />
      )}
    </PageContent>
  );
};
