/* eslint prefer-arrow-callback: off */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const request = require ('request');
const db = require ('../../dist/db');
const url = require ('./test-main').url;

describe ('polls (unauthenticated)', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      db.removePolls ();
    }).then (() => {
      const polls = [
        {
          creator: 'amy',
          title: 'Poll a1',
          choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
        },
        {
          creator: 'amy',
          title: 'Poll a2',
          choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
        },
        {
          creator: 'bob',
          title: 'Poll b1',
          choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
        },
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
          const data = JSON.parse (body);
          if (data.length === 3) {
            return done ();
          } else {
            return done (new Error (`Invalid number of polls: ${data.length}`));
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
      const polls = [
        {
          creator: 'amy',
          title: 'Poll a1',
          choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
        },
        {
          creator: 'amy',
          title: 'Poll a2',
          choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
        },
        {
          creator: 'bob',
          title: 'Poll b1',
          choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
        },
      ];
      return db.insertPoll (polls);
    }).then (result => {
      pollIds = result.insertedIds;
      const form = { form: { username: 'amy', password: 'test' } };
      request.post (`${url}api/login`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          cookie = res.headers['set-cookie'][0];
          return done ();
        } else {
          return done (new Error (`statusCode: ${res.statusCode}`));
        }
      });
    }).catch (err => {
      done (err);
    });
  });

  afterEach (function (done) {
    request.post (`${url}api/logout`, () => {
      done ();
    });
  });

  describe ('get all polls', function () {
    it ('should return 3 polls', function (done) {
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.get ({ url: `${url}api/polls`, jar }, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const data = JSON.parse (body);
          if (data.length === 3) {
            return done ();
          } else {
            return done (new Error (`Invalid number of polls: ${data.length}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('get single poll', function () {
    it ('should return 1 poll', function (done) {
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.get ({ url: `${url}api/polls/${pollIds[1]}`, jar }, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const data = JSON.parse (body);
          if (data.creator) {
            return done ();
          } else {
            return done (new Error (`Invalid polls: ${data}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('get single poll (not found)', function () {
    it ('should return 404', function (done) {
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.get ({ url: `${url}api/polls/000000000000000000000000`, jar }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add a poll', function () {
    it ('should end with 4 polls', function (done) {
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      const poll = { title: 'Poll anew', choices: ['Cake', 'Pie'] };
      request.post ({ url: `${url}api/polls`, jar, json: poll }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.get ({ url: `${url}api/polls`, jar }, (err2, res2, body2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              const data = JSON.parse (body2);
              if (data.length === 4) {
                return done ();
              } else {
                return done (new Error (`Invalid poll count: ${data.length}`));
              }
            } else {
              return done (new Error (`Invalid status code ${res2.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('update a poll', function () {
    it ('should have updated fields', function (done) {
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      const json = { title: 'UTitle', choices: ['U1', 'U2'] };
      request.post ({ url: `${url}api/polls/${pollIds[1]}`, jar, json }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const fullUrl = `${url}api/polls/${pollIds[1]}`;
          return request.get ({ url: fullUrl, jar }, (err2, res2, body2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              const data = JSON.parse (body2);
              if ((data.title === 'UTitle') &&
                  (data.choices[0].text === 'U1') &&
                  (data.choices[1].text === 'U2')) {
                return done ();
              } else {
                return done (new Error (`Invalid field content: ${JSON.stringify (data)}`));
              }
            } else {
              return done (new Error (`Invalid status code ${res2.statusCode}`));
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
      const jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      request.del ({ url: `${url}api/polls/${pollIds[1]}`, jar }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.get ({ url: `${url}api/polls`, jar }, (err2, res2, body2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              const data = JSON.parse (body2);
              if (data.length === 2) {
                return done ();
              } else {
                return done (new Error (`Invalid poll count: ${data.length}`));
              }
            } else {
              return done (new Error (`Invalid status code ${res2.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('vote', function () {
    it ('should add 1 vote to a poll', function (done) {
      const pollId = pollIds[1].toString ();
      request.post (`${url}api/polls/${pollId}/votes/No`, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.get (`${url}api/polls`, (err2, res2, body2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              const polls = JSON.parse (body2);
              for (const poll of polls) {
                if (poll._id === pollId) {
                  if (poll.choices[1].votes === 1) {
                    return done ();
                  } else {
                    return done (new Error (`Bad vote count: ${JSON.stringify (poll, null, 2)}`));
                  }
                }
              }
              return done (new Error (`Voting poll not found: ${pollIds[1]}`));
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
});
