import { Box, PageContent, TabContainer, TabController, Tab, TabPanel, Text } from 'uikit';
import { usePollsOwn } from '../../data/usePolls';
import { PollItem } from '../poll';

export const Result = () => {
  const { data: polls, isLoading, isError, isSuccess } = usePollsOwn ();

  return (
    <PageContent>
      <Text as='h1' center>Poll Results</Text>
      { isLoading && (
        <Text>Loading...</Text>
      )}
      { isError && (
        <Text>Error loading your polls</Text>
      )}
      { isSuccess && polls.length === 0 && (
        <Text>You do not have any polls yet</Text>
      )}
      { isSuccess && polls.length > 0 && (
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
      )}
    </PageContent>
  );
};
