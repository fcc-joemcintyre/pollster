import React from 'react';

const AboutPage = () => {
  return (
    <div className='aboutPage'>
      <h2>About Pollster</h2>
      <p>Written by Joe McIntyre, Pollster is a full stack project defined by
        FreeCodeCamp. (
        <a
          href='https://www.freecodecamp.com/challenges/build-a-voting-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Link
        </a>
        )
      </p>
      <p>The source code is published on GitHub under a MIT license. (
        <a
          href='https://github.com/fcc-joemcintyre/pollster'
          target='_blank'
          rel='noopener noreferrer'
        >
          Link
        </a>
        )
      </p>
      <p>Technologies used include:</p>
      <ul>
        <li>Client: React (15.x), React-Redux and React-Router</li>
        <li>Server: Node (6.x) using Express and Passport</li>
        <li>Database: Mongo (3.x)</li>
        <li>Languages: Javascript (ES2015), CSS (SCSS using Sass)</li>
      </ul>
      <p>Thanks to:</p>
      <ul>
        <li>GitHub (source hosting)</li>
        <li>Heroku (app hosting)</li>
        <li>mlab (database hosting)</li>
        <li>TravisCI (continuous integration testing)</li>
      </ul>
    </div>
  );
};

export default AboutPage;
