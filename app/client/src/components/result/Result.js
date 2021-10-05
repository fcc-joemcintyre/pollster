// @ts-check
import { Typography } from '@mui/material';
import { usePolls } from '../../data/usePolls';
import { PageContent } from '../util';
import { ResultContent } from './ResultContent';

export const Result = () => {
  const { data: polls, isLoading, isError, isSuccess } = usePolls (true);

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center' gutterBottom>
        Poll Results
      </Typography>
      { isLoading ? (
        <Typography>Loading...</Typography>
      ) : (isError || !polls) ? (
        <Typography>Error loading your polls</Typography>
      ) : isSuccess && polls.count === 0 ? (
        <Typography>You do not have any polls yet</Typography>
      ) : isSuccess && polls.count > 0 && (
        <ResultContent polls={polls.polls} />
      )}
    </PageContent>
  );
};
