const db = require ('../../dist/db');

describe ('polls', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      return db.removePolls ({});
    }).then (() => {
      const polls = [
        {
          creator: 'amy',
          title: 'Poll 1',
          choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
        },
        {
          creator: 'bob',
          title: 'Poll 2',
          choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
        },
      ];
      return db.insertPoll (polls);
    }).then (() => {
      done ();
    }).catch ((err) => {
      done (err);
    });
  });

  describe ('find all polls', function () {
    it ('2 polls should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getPolls ();
      }).then ((result) => {
        if (result.length !== 2) {
          return done (new Error (`Wrong number of polls returned: ${result.length}`));
        }
        return done ();
      })
      .catch ((err) => { done (err); });
    });
  });

  describe ('add poll', function () {
    it ('3 polls should be found, 2 belonging to amy', function (done) {
      Promise.resolve ().then (() => {
        const poll = {
          creator: 'amy',
          title: 'Poll 3',
          choices: [{ text: '1', votes: 0 }, { text: '2', votes: 0 }],
        };
        return db.insertPoll (poll);
      }).then ((result) => {
        if (result.result.n !== 1) {
          return done (new Error (`Wrong number of records inserted: ${result.length}`));
        }
        return db.getPolls ();
      }).then ((result) => {
        if (result.length !== 3) {
          return done (new Error (`Wrong number of polls: ${result.length}`));
        }
        return done ();
      }).catch ((err) => {
        done (err);
      });
    });
  });

  describe ('vote', function () {
    it ('should show vote counted for every item', function (done) {
      Promise.resolve ().then (() => {
        return db.getPolls ();
      }).then ((polls) => {
        const promises = [];
        for (const poll of polls) {
          for (const choice of poll.choices) {
            promises.push (db.vote (poll._id, choice.text));
          }
        }
        Promise.all (promises)
        .then (() => {
          return db.getPolls ();
        }).then ((polls2) => {
          for (const poll of polls2) {
            for (const choice of poll.choices) {
              if (choice.votes !== 1) {
                return done (new Error ('Votes not recorded correctly', JSON.stringify (poll)));
              }
            }
          }
          return done ();
        });
      }).catch ((err) => {
        done (err);
      });
    });
  });
});
