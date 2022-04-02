import { useCallback, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { PollItem } from '../poll';
import { Poll } from '../../data/usePolls.js';

type Props = {
  polls: Poll[],
}

/**
 * Poll result display
 * @param Props
 * @returns Component
 */
export const ResultContent = ({ polls }: Props) => {
  const [tab, setTab] = useState (polls[0].key);

  const onTab = useCallback ((e, value) => {
    setTab (value);
  }, [setTab]);

  const panels = polls.map ((a) => {
    const totalVotes = a.choices.reduce ((c, b) => c + b.votes, 0);
    const choices = a.choices.map ((choice) => {
      const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
      return (
        <PollItem key={choice.text} text={choice.text} percent={percent} />
      );
    });

    return (
      <Box key={a.key} hidden={tab !== a.key}>
        <Typography variant='h2' mt='1rem' textAlign='center'>
          {a.title}
        </Typography>
        <Typography paragraph textAlign='center'>
          Total Votes: {totalVotes}
        </Typography>
        { choices }
      </Box>
    );
  });

  return (
    <>
      <Tabs value={tab} onChange={onTab} aria-label='poll results'>
        { polls.map ((a) => <Tab key={a.key} value={a.key} label={a.title} />) }
      </Tabs>
      {panels}
    </>
  );
};
