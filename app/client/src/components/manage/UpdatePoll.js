// @ts-check
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createField } from '@cygns/use-fields';
import { usePoll } from '../../data/usePolls';
import { PageContent } from '../util';
import { UpdatePollController } from './UpdatePollController';

export const UpdatePoll = () => {
  /** @type {{ key: string }} */
  const params = useParams ();
  const key = Number (params.key);
  const { data: poll, isLoading, isError } = usePoll (key);

  const initial = [];
  if (poll) {
    initial.push (createField ('title', poll.title, true));
    let index = 0;
    for (const value of poll.choices) {
      initial.push (createField (`choice${index}`, value.text, index < 2));
      index += 1;
    }
  }

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center' gutterBottom>
        Update Poll
      </Typography>
      { isLoading && (
        <Typography textAlign='center'>Loading ...</Typography>
      )}
      { isError && (
        <Typography textAlign='center'>Poll not found</Typography>
      )}
      { poll && (
        <UpdatePollController pollKey={key} initial={initial} />
      )}
    </PageContent>
  );
};
