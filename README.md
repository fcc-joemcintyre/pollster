# Pollster

Internet polls done easy. Create an account, create some polls, manage your polls,
vote on other people's polls, see your poll results !

This application is built using *React (15.0)*, *Redux* and *react-router* on
the client. The server uses *Node (6.0.x)* and *Express (4.13.x)*.

## Live instance

The application can be used at https://pollster-jm.herokuapp.com

## Development setup

Clone the *Github* repo, then install the dependencies using *npm*.

```
git clone https://github.com/fcc-joemcintyre/pollster.git
cd pollster
npm install
```

The database supported is *MongoDB*. This can be a local or hosted instance (you
can also choose to use a local instance for dev/test and a hosted instance for
deployment). The database name for the application is *pollster*. The database
name used by the test runner is *pollsterTest*.

### Build

In a terminal, build can be activated with

```
npm run [build | build-stage]
```

The build uses *gulp* to run the set of tasks defined in *gulpfile.js*. The
build options are,

- build: regular build
- build-stage: build application ready to be deployed to Heroku or similar

*build* is a continuous build option - the gulp build will
set up watches and rerun build elements as file changes are saved.
*build-stage* is a one time build option, run again to build a new stage output.

## Testing

Testing can be done for all components,

```
npm test
```

Or components individually,

```
npm run test-db
npm run test-server
```

### Server

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
