import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PageContent } from '../util';
import { usePoll, useVote } from '../../data/usePolls';
import { PollItem } from './PollItem';

export const Poll = () => {
  const [selected, setSelected] = useState (-1);
  const [voted, setVoted] = useState (false);
  const navigate = useNavigate ();
  const params = useParams ();
  const key = Number (params.key);
  const { data: poll, isLoading, isError } = usePoll (key);
  const vote = useVote ();

  const handleVote = useCallback (() => {
    if (poll && selected !== -1) {
      const choice = poll.choices[selected];
      vote.mutate ({ key: poll.key, choice: choice.text }, {
        onSuccess: () => setVoted (true),
      });
    }
  }, [poll, selected, vote]);

  if (isLoading) {
    return (
      <PageContent>
        <Typography>Loading...</Typography>
      </PageContent>
    );
  }
  if (isError || !poll) {
    return (
      <PageContent>
        <form
          onSubmit={(e) => {
            e.preventDefault ();
            navigate ('/');
          }}
        >
          <Typography paragraph textAlign='center'>
            Sorry, could not find that poll for you.
          </Typography>
          <Box m='16px auto 0 auto'>
            <Button type='submit' autoFocus variant='contained'>
              Back to Polls
            </Button>
          </Box>
        </form>
      </PageContent>
    );
  }

  const votes = poll.choices.reduce ((a, b) => a + b.votes, 0);
  const rows = poll.choices.map ((choice, index) => {
    const text = (index === selected) ? `\u2713 ${choice.text}` : choice.text;
    if (voted) {
      return (
        <PollItem
          key={text}
          text={text}
          percent={votes > 0 ? Math.floor ((choice.votes / votes) * 100) : 0}
        />
      );
    } else {
      return (
        <PollItem
          key={text}
          text={text}
          percent={0}
          onClick={() => { setSelected (index); }}
        />
      );
    }
  });

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center'>{poll.title}</Typography>
      <Box mt='20px'>
        {rows}
      </Box>
      { !voted && (
        <Box mt='20px'>
          <Typography textAlign='center'>
            Select your favorite, the poll results will be shown after you vote.
          </Typography>
          <Typography textAlign='center'>
            Want others to participate in this poll, share the following link,<br />
            {window.origin}/polls/{key}
          </Typography>
        </Box>
      )}
      <Grid container spacing={1} width='100%' mt='1rem' justifyContent='center'>
        { !voted && (
          <Grid item>
            <Button
              type='button'
              disabled={(selected === -1)}
              onClick={handleVote}
            >
              Vote
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            type='button'
            onClick={() => { navigate ('/'); }}
          >
            Back to Polls
          </Button>
        </Grid>
      </Grid>
    </PageContent>
  );
};
