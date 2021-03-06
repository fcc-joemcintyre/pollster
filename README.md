# Pollster

Internet polls done easy. Create an account, create some polls, manage your polls,
vote on other people's polls, see your poll results !

This application is built using *React (17.x)*, *React-Redux (7.x)* and
*React-Router (5.x)* on the client. The server uses *Node (14.x)* and
*Express (4.17.x)*.

## Live instance

The application can be used at https://pollster-jm.herokuapp.com

## Development setup

*Note*: This project uses NPM workspaces, which requires NPM 7.x. To install
this version of NPM, use,

```
npm i -g npm
```

Clone the *Github* repo, and switch to the project directory.

```
git clone https://github.com/fcc-joemcintyre/pollster.git
cd pollster
```

Then install the dependencies using *npm* or *yarn*.

```
npm install
```

The database supported is *MongoDB*. This can be a local or hosted instance (you
can also choose to use a local instance for dev/test and a hosted instance for
deployment). The database name for the application is *pollster*. The database
name used by the test runner is *pollsterTest*.

## Scripts

Scripts are provided for build, test and run. Yarn is used in the examples,
but the NPM client can be used as well. When using the NPM client, include
*run* before script names (e.g. npm run build).

### Build (Development)

There are two build processes for development, one for the server and one for
the client.

In one terminal,

```
npm run dev:server
```

In a second terminal,

```
npm run dev:client
```

These development builds are continuous build - they will set up watches
and rerun build elements as file changes are saved.

### Build (Production)

There is one build command that runs both server and client production builds.

In a terminal,

```
npm run prod
```

This production build is a single step process, it is not continuous build.

## Testing

Testing is set up in each of the client and server directorys. Switch to the desired
directory and run the tests.

```
cd app/server
npm test
```

```
cd app/client
npm test
```

### Server (Development mode)

In a terminal, continuous server operation, updating on changes,
can be activated with

```
npm start
```

The *nodemon* utility provides restart on update.

### Client

After starting a server instance, open a browser and then access the
application at http://localhost:3000

## Deployment

The build process creates the *dist* directory containing all the deployment
files (in the project directory or in the staging directory).

The entry point for the server is *main.js*.
The port number for the server can be passed on the command (-p/--port) or using
the PORT environment variable. For hosted environments, the PORT environment
variable provided by the hosting service is used.

The application also uses the following environment variables,

- SESSION_SECRET

HTTP Session secret (any text string).

## License

MIT
