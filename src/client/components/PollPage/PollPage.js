import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Flex, PageContent, Text } from 'uikit';
import { vote } from '../../store/pollsActions';
import { Header } from '../Header';
import { PollItem } from './PollItem';

export const PollPage = () => {
  const [selected, setSelected] = useState (-1);
  const [voted, setVoted] = useState (false);
  const history = useHistory ();
  const params = useParams ();
  const poll = useSelector ((state) => state.polls.find ((a) => (a._id === params._id)));
  const dispatch = useDispatch ();

  async function handleVote () {
    if (selected !== -1) {
      try {
        const choice = poll.choices[selected];
        await dispatch (vote (poll._id, choice.text));
        setVoted (true);
      } catch (err) {
        // no op
      }
    }
  }

  if (!poll) {
    return (
      <Fragment>
        <Header />
        <PageContent>
          <form
            onSubmit={(e) => {
              e.preventDefault ();
              history.push ('/');
            }}
          >
            <Text as='p' center>Sorry, could not find that poll for you.</Text>
            <Flex center mt='16px'>
              <Button type='submit' center autoFocus>Back to Polls</Button>
            </Flex>
          </form>
        </PageContent>
      </Fragment>
    );
  }

  const totalVotes = poll.choices.reduce ((a, b) => a + b.votes, 0);
  const rows = poll.choices.map ((choice, index) => {
    const text = (index === selected) ? `\u2713 ${choice.text}` : choice.text;
    let percent = 0;
    if (voted) {
      if (totalVotes > 0) {
        percent = Math.floor ((choice.votes / totalVotes) * 100);
      }
      return <PollItem key={text} text={text} percent={percent} selected={false} />;
    } else {
      return (
        <PollItem
          key={text}
          text={text}
          percent={percent}
          selected={selected !== -1}
          onClick={() => { setSelected (index); }}
        />
      );
    }
  });

  return (
    <Fragment>
      <Header />
      <PageContent>
        <Text as='h1' center>{poll.title}</Text>
        <Box mt='20px'>
          {rows}
        </Box>
        { !voted && (
          <Box mt='20px'>
            <Text as='p' center>
              Select your favorite, the poll results will be shown after you vote.
            </Text>
          </Box>
        )}
        <Flex center mt='20px' gap='6px'>
          { !voted && (
            <Button
              type='button'
              disabled={(selected === -1)}
              onClick={handleVote}
            >
              Vote
            </Button>
          )}
          <Button
            type='button'
            onClick={() => { history.push ('/'); }}
          >
            Back to Polls
          </Button>
        </Flex>
      </PageContent>
    </Fragment>
  );
};
