import { useSelector } from 'react-redux';
import { Box, PageContent, TabContainer, TabController, Tab, TabPanel, Text } from 'uikit';
import { PollItem } from '../poll';

export const Result = () => {
  const polls = useSelector ((state) => state.polls.filter ((a) => (a.creator === state.user.key)));
  useSelector (state => console.log (state));
  // if no polls for user, display message
  if (polls.length === 0) {
    return (
      <PageContent>
        <Text as='h1' center>Poll Results</Text>
        <Text as='p' center>You do not have any polls yet</Text>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <Text as='h1' center>Poll Results</Text>
      <TabController initialValue={polls[0].key}>
        <TabContainer>
          { polls.map ((a) => <Tab key={a.key} value={a.key}>{a.title}</Tab>) }
        </TabContainer>
        { polls.map ((a) => {
          const totalVotes = a.choices.reduce ((c, b) => c + b.votes, 0);
          const choices = a.choices.map ((choice) => {
            const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
            return (
              <PollItem key={choice.text} text={choice.text} percent={percent} />
            );
          });

          return (
            <TabPanel key={a.key} value={a.key}>
              <Box>
                <Text as='h2' center>{a.title}</Text>
                <Text as='p' center>Total Votes: {totalVotes}</Text>
                { choices }
              </Box>
            </TabPanel>
          );
        })}
      </TabController>
    </PageContent>
  );
};
