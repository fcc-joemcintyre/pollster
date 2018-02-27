import React from 'react';
import { PageContent, Box } from '../../lib/Layout';
import { Heading, P, TextLink, UL, LI } from '../../lib/Text';

export const AboutPage = () => (
  <PageContent>
    <Heading center>About Pollster</Heading>
    <Box center noborder w='500px'>
      <P>
        Written by Joe McIntyre, Pollster is a full stack project defined by FreeCodeCamp. (
        <TextLink href='https://www.freecodecamp.com/challenges/build-a-voting-app'>
          Link
        </TextLink>
        )
      </P>
      <P>
        The source code is pubLIshed on GitHub under a MIT LIcense. (
        <TextLink href='https://github.com/fcc-joemcintyre/pollster'>
          Link
        </TextLink>
        )
      </P>
      <P>
        Technologies used include:
      </P>
      <UL>
        <LI>Client: React (16.x), Styled Components, React Redux, and React Router</LI>
        <LI>Server: Node (8.x) using Express and Passport</LI>
        <LI>Database: Mongo (3.4.x)</LI>
        <LI>Languages: Javascript (ES2017), CSS</LI>
      </UL>
      <P>
        Thanks to:
      </P>
      <UL>
        <LI>GitHub (source hosting)</LI>
        <LI>Heroku (app hosting)</LI>
        <LI>mlab (database hosting)</LI>
        <LI>TravisCI (continuous integration testing)</LI>
      </UL>
    </Box>
  </PageContent>
);
