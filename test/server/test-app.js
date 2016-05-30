'use strict';
const request = require ('request');
const db = require ('../../dist/db');
const url = require ('./test-main').url;

describe ('polls (unauthenticated)', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      db.removePolls ();
    }).then (() => {
      let polls = [
        {creator: 'amy', title: 'Poll a1', choices: [{text: 'Tigers', votes: 0}, {text: 'Bears', votes: 0}]},
        {creator: 'amy', title: 'Poll a2', choices: [{text: 'Yes', votes: 0}, {text: 'No', votes: 0}]},
        {creator: 'bob', title: 'Poll b1', choices: [{text: 'Red', votes: 0}, {text: 'Blue', votes: 0}]}
      ];
      return db.insertPoll (polls);
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('get all polls', function () {
    it ('should return 3 polls', function (done) {
      request.get (`${url}api/polls`, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if (body.length === 3) {
            return done ();
          } else {
            return done (new Error (`Invalid number of polls: ${body.length}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('polls (authenticated)', function () {
  let cookie;
  let pollIds = [];
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      db.removePolls ();
    }).then (() => {
      db.insertUser ('amy', 'test');
    }).then (() => {
      let polls = [
        {creator: 'amy', title: 'Poll a1', choices: [{text: 'Tigers', votes: 0}, {text: 'Bears', votes: 0}]},
        {creator: 'amy', title: 'Poll a2', choices: [{text: 'Yes', votes: 0}, {text: 'No', votes: 0}]},
        {creator: 'bob', title: 'Poll b1', choices: [{text: 'Red', votes: 0}, {text: 'Blue', votes: 0}]}
      ];
      return db.insertPoll (polls);
    }).then (result => {
      pollIds = result.insertedIds;
      let form = { form: {username:'amy', password:'test'}};
      request.post (`${url}api/login`, form, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          cookie = res.headers['set-cookie'][0];
          done ();
        } else {
          done (new Error ('statusCode:' + res.statusCode));
        }
      });
    }).catch (err => {
      done (err);
    });
  });

  afterEach (function (done) {
    request.post (`${url}api/logout`, (err, res, body) => {
      done ();
    });
  });

  describe ('get all polls', function () {
    it ('should return 3 polls', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.get ({url: `${url}api/polls`, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if (body.length === 3) {
            return done ();
          } else {
            return done (new Error (`Invalid number of polls: ${body.length}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('get single poll', function () {
    it ('should return 1 poll', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.get ({url: `${url}api/polls/${pollIds[1]}`, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if (body.creator) {
            return done ();
          } else {
            return done (new Error (`Invalid polls: ${body}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add a poll', function () {
    it ('should end with 4 polls', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let poll = {title: 'Poll anew', choices: ['Cake', 'Pie']};
      request.post ({url: `${url}api/polls`, jar: jar, json: poll}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get ({url: `${url}api/polls`, jar: jar}, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              body = JSON.parse (body);
              if (body.length === 4) {
                return done ();
              } else {
                return done (new Error (`Invalid poll count: ${body.length}`));
              }
            } else {
              return done (new Error (`Invalid status code ${res.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('delete a poll', function () {
    it ('should end with 2 polls', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.del ({url: `${url}api/polls/${pollIds[1]}`, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get ({url: `${url}api/polls`, jar: jar}, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              body = JSON.parse (body);
              if (body.length === 2) {
                return done ();
              } else {
                return done (new Error (`Invalid poll count: ${body.length}`));
              }
            } else {
              return done (new Error (`Invalid status code ${res.statusCode}`));
            }
          });
        }
      });
    });
  });

  describe ('vote', function () {
    it ('should add 1 vote to a poll', function (done) {
      let pollId = pollIds[1].toString ();
      request.post (`${url}api/polls/${pollId}/votes/No`, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get (`${url}api/polls`, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              let polls = JSON.parse (body);
              for (let poll of polls) {
                if (poll._id === pollId) {
                  console.log (1, poll);
                  if (poll.choices[1].votes === 1) {
                    return done ();
                  } else {
                    return done (new Error (`Invalid vote count: ${JSON.stringify (poll, null, 2)}`));
                  }
                }
              }
              return done (new Error (`Voting poll not found: ${pollIds[1]}`));
            } else {
              return done (new Error (`Invalid status code ${res.statusCode}`));
            }
          });
        }
      });
    });
  });
});
