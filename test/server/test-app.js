const db = require ('../../dist/db');
const jsonFetch = require ('../util/jsonFetch');
const JsonFetchError = require ('../util/JsonFetchError');

describe ('polls (unauthenticated)', function () {
  beforeEach (async function () {
    await db.removePolls ();
    const polls = [
      {
        creator: 'amy',
        title: 'Poll a1',
        choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
      {
        creator: 'amy',
        title: 'Poll a2',
        choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
      {
        creator: 'bob',
        title: 'Poll b1',
        choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
    ];
    await db.insertPoll (polls);
  });

  describe ('get all polls', function () {
    it ('should return 3 polls', async function () {
      const data = await jsonFetch.get ('/api/polls');
      if (data.length !== 3) {
        throw new Error (`Invalid number of polls: ${data.length}`);
      }
    });
  });
});

describe ('polls (authenticated)', function () {
  let pollIds = [];
  beforeEach (async function () {
    await db.removePolls ();
    const amy = await db.findUserByUsername ('amy');
    if (! amy) {
      await db.insertUser ('amy', 'test');
    }
    const polls = [
      {
        creator: 'amy',
        title: 'Poll a1',
        choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
      {
        creator: 'amy',
        title: 'Poll a2',
        choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
      {
        creator: 'bob',
        title: 'Poll b1',
        choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      },
    ];
    const result = await db.insertPoll (polls);
    pollIds = result.insertedIds;
    const data = { username: 'amy', password: 'test' };
    try {
      await jsonFetch.post ('/api/login', data);
    } catch (err) {
      throw new Error ('login error');
    }
  });

  afterEach (async function () {
    await jsonFetch.post ('/api/logout');
  });

  describe ('get all polls', function () {
    it ('should return 3 polls', async function () {
      const data = await jsonFetch.get ('/api/polls');
      if (data.length !== 3) {
        throw new Error (`Invalid number of polls: ${data.length}`);
      }
    });
  });

  describe ('get single poll', function () {
    it ('should return 1 poll', async function () {
      const data = await jsonFetch.get (`/api/polls/${pollIds[1]}`);
      if (! data) {
        throw new Error ('Invalid poll');
      }
    });
  });

  describe ('get single poll (not found)', function () {
    it ('should return 404', async function () {
      try {
        await jsonFetch.get ('/api/polls/000000000000000000000000');
        throw new JsonFetchError (200, 'did not return 404');
      } catch (err) {
        if (err.status !== 404) {
          throw new Error ('Invalid status');
        }
      }
    });
  });

  describe ('add a poll', function () {
    it ('should end with 4 polls', async function () {
      const poll = {
        title: 'Poll anew',
        choices: ['Cake', 'Pie'],
        voteLimit: false,
        maxVotes: 0,
        dateLimit: false,
        endDate: '',
      };
      await jsonFetch.post ('/api/polls', poll);
      const data = await jsonFetch.get ('/api/polls');
      if (data.length !== 4) {
        throw new Error (`Invalid poll count: ${data.length}`);
      }
    });
  });

  describe ('update a poll', function () {
    it ('should have updated fields', async function () {
      const json = {
        title: 'UTitle',
        choices: ['U1', 'U2'],
        voteLimit: true,
        maxVotes: 1000,
        dateLimit: true,
        endDate: '12/31/2017',
      };
      await jsonFetch.post (`/api/polls/${pollIds[1]}`, json);
      const data = await jsonFetch.get (`/api/polls/${pollIds[1]}`);
      if ((data.title !== 'UTitle') ||
          (data.choices[0].text !== 'U1') ||
          (data.choices[1].text !== 'U2') ||
          (data.voteLimit !== true) ||
          (data.maxVotes !== 1000) ||
          (data.dateLimit !== true) ||
          (data.endDate !== '12/31/2017')) {
        throw new Error (`Invalid field content: ${JSON.stringify (data)}`);
      }
    });
  });

  describe ('delete a poll', function () {
    it ('should end with 2 polls', async function () {
      await jsonFetch.remove (`/api/polls/${pollIds[1]}`);
      const data = await jsonFetch.get ('/api/polls');
      if (data.length !== 2) {
        throw new Error (`Invalid poll count: ${data.length}`);
      }
    });
  });

  describe ('vote', function () {
    it ('should add 1 vote to a poll', async function () {
      await jsonFetch.post (`/api/polls/${pollIds[1]}/votes/No`);
      const polls = await jsonFetch.get ('/api/polls');
      const poll = polls.find ((a) => { return pollIds[1].equals (a._id); });
      if (poll.choices[1].votes !== 1) {
        throw new Error (`Bad vote count: ${JSON.stringify (poll, null, 2)}`);
      }
    });
  });
});
