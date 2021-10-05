// @ts-check
import { Box, List, ListItem, Typography } from '@mui/material';
import { LinkExternal } from '@cygns/muikit';
import { PageContent } from '../util';

export const About = () => (
  <PageContent>
    <Typography variant='h1' textAlign='center' gutterBottom>
      About Pollster
    </Typography>
    <Box maxWidth='500px'>
      <Typography paragraph>
        Pollster is a poll taking and management application.
      </Typography>
      <Typography paragraph>
        The <LinkExternal href='https://github.com/fcc-joemcintyre/pollster'>source code</LinkExternal> is
        published on GitHub under a MIT LIcense.
      </Typography>
      <Typography>
        Technologies used include:
      </Typography>
      <List dense>
        <ListItem>Client: React (17.x), Material-UI, Emotion, React Query, and React Router</ListItem>
        <ListItem>Server: Node (16.x) using Express and Passport</ListItem>
        <ListItem>Database: Mongo (4.x)</ListItem>
        <ListItem>Languages: Javascript (ES2020+), CSS</ListItem>
      </List>
      <Typography>
        Thanks to:
      </Typography>
      <List dense>
        <ListItem>GitHub (source hosting)</ListItem>
        <ListItem>Heroku (app hosting)</ListItem>
        <ListItem>MongoDB Atlas (database hosting)</ListItem>
        <ListItem>TravisCI (continuous integration testing)</ListItem>
      </List>
    </Box>
  </PageContent>
);
