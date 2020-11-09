# Pollster Design

The *Pollster* application is a full stack application project for
managing and participating in polls.

## License
This document is licensed under a Creative Commons Attribution 4.0
International License (CC-BY).

The source code for the project is made available under a MIT license,
https://www.github.com/fcc-joemcintyre/pollster/LICENSE.txt

# Overview

Pollster provides access to polls and the facilities to create and manage polls.
Anyone can vote in a poll, whether they register or not. For users that register,
they can create and manage polls, and see the results of their polls on a
dedicated results page.

An instance of the application is hosted on Heroku at
https://pollster-jm/herokuapp.com

# Design

## Functional Requirements

Client Loading:

- The server will serve a web application to a connecting browser

Client Display:

- home page shows all active polls, allowing voting by any user
- a user can register to enable additional functions after logging on
- a registered user can login to access the following functions,
  - manage their profile
  - create, edit and delete polls
  - see the results of their polls on a dedicated page
  - logout
- polls display the current votes for each choice after voting
  - graphical bar shows percentage for each choice
  - numeric percentage shown on bar of each choice

Data Exchange:

- The server will accept REST calls for,
  - register
  - login, logout, verifyLogin (for continuing session)
  - add, query, edit, remove polls
  - vote in a poll

## Data Definitions

#### User

| Field    | Description |
| -------- | ----------- |
| username | Unique, indexed. Short text name for user |
| hash     | Password hash |
| salt     | Password salt |
| name     | Full name |
| email    | Email address |

#### Polls

| Field      | Description |
| ---------- | ----------- |
| creator    | FKey users.username. Poll creator. |
| title      | Poll title. |
| choices    | Array of poll choices. |
|  > text    | Choice text. |
|  > votes   | Number of votes. |

## Non-Functional Requirements

The application processor, memory and storage requirements will fit within the
constraints to be hosted on a free Heroku dyno.

No redundancy or scaling features are implemented.

The Heroku instance uses HTTPS for transport security between the browser and
application. Other deployments of this application must also use HTTPS since
authentication and sessions are essential to the applications function.

## Technology Selections

The server is implemented with Node.js version 14.x and uses ES2020 Javascript
conforming to the native ES support provided in this version of Node.js.
Data is stored in MongoDB (4.x).

The client interface is implemented with React 17.0.x using ES2020 Javascript
as supported by Babel. Redux and react-router are also used.

Styling is defined using the Styled Components CSS-in-JS library.

Build is done with npm scripts (server) and Webpack (client).
