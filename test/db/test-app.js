const db = require ('../../dist/db');
const expect = require ('chai').expect;

describe ('polls', function () {
  beforeEach (async function () {
    await db.removePolls ();
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
    await db.insertPoll (polls[0]);
    await db.insertPoll (polls[1]);
  });

  describe ('find all polls', function () {
    it ('2 polls should be found', async function () {
      const polls = await db.getPolls ();
      expect (polls).to.be.length (2);
    });
  });

  describe ('add poll', function () {
    it ('3 polls should be found, 2 belonging to amy', async function () {
      const input = {
        creator: 'amy',
        title: 'Poll 3',
        choices: [{ text: '1', votes: 0 }, { text: '2', votes: 0 }],
      };
      const poll = await db.insertPoll (input);
      expect (poll.result.n).to.equal (1);
      const polls = await db.getPolls ();
      expect (polls).to.be.length (3);
    });
  });

  describe ('vote', function () {
    it ('should show vote counted for every item', async function () {
      const polls = await db.getPolls ();
      const promises = [];
      for (const poll of polls) {
        for (const choice of poll.choices) {
          promises.push (db.vote (poll._id, choice.text));
        }
      }
      await Promise.all (promises);
      const polls2 = await db.getPolls ();
      for (const poll of polls2) {
        for (const choice of poll.choices) {
          expect (choice.votes).to.equal (1);
        }
      }
    });
  });
});
