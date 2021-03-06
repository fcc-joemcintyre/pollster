// @ts-check
import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { PollItem } from '../poll';

/**
  @typedef {import ('../../types/types').Poll} Poll

  @typedef {Object} Props
  @property {Poll[]} polls
*/

/**
 * Poll result display
 * @param {Props} param0 Props
 * @returns {JSX.Element} Component
 */
export const ResultContent = ({ polls }) => {
  const [tab, setTab] = useState (polls[0].key);

  function onTab (e, value) {
    setTab (value);
  }

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
