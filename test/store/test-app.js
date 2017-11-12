import assert from 'assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as types from '../../src/client/store/pollsConstants';
import * as actions from '../../src/client/store/pollsActions';
import pollsReducer from '../../src/client/store/polls';
import freeze from '../util/freeze';

const middleware = [thunk];
const mockStore = configureMockStore (middleware);

describe ('Test app action creators', function () {
  describe ('ActionCreator: SET_POLLS', function () {
    it ('should create action to set polls', function () {
      const polls = [];
      const expectedAction = {
        type: types.SET_POLLS,
        polls,
      };
      const action = actions.setPolls (polls);
      assert.deepStrictEqual (expectedAction, action);
    });
  });
});

describe ('Test account async actions', function () {
  afterEach (function () {
    nock.cleanAll ();
  });

  describe ('init polls (no polls)', function () {
    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, []);

      const expectedActions = [
        { type: types.SET_POLLS, polls: [] },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.initPolls ());
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('init polls (with polls)', function () {
    const polls = [
      {
        _id: '1000',
        creator: 'amy',
        title: 'Poll a1',
        choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
      },
      {
        _id: '1001',
        creator: 'amy',
        title: 'Poll a2',
        choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
      },
      {
        _id: '1002',
        creator: 'bob',
        title: 'Poll b1',
        choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
      },
    ];
    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, [polls[0], polls[1], polls[2]]);

      const expectedActions = [
        { type: types.SET_POLLS, polls: [polls[0], polls[1], polls[2]] },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.initPolls ());
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('add poll', function () {
    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/polls')
        .reply (200, { _id: '0001' });
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, [{
          _id: '0001',
          creator: 'amy',
          title: 'Treat',
          choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Ice Cream', votes: 0 }],
        }]);

      const expectedActions = [
        {
          type: types.SET_POLLS,
          polls: [{
            _id: '0001',
            creator: 'amy',
            title: 'Treat',
            choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Ice Cream', votes: 0 }],
          }],
        },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.addPoll ('Treat',
        [{ text: 'Popsicle', votes: 0 }, { text: 'Ice Cream', votes: 0 }]));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('update poll', function () {
    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/polls/0001')
        .reply (200, {});
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, [{
          _id: '0001',
          creator: 'amy',
          title: 'Treat',
          choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Blizzard', votes: 0 }],
        }]);

      const expectedActions = [
        {
          type: types.SET_POLLS,
          polls: [{
            _id: '0001',
            creator: 'amy',
            title: 'Treat',
            choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Blizzard', votes: 0 }],
          }],
        },
      ];
      const store = mockStore ([
        {
          _id: '0001',
          creator: 'amy',
          title: 'Treat',
          choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Ice Cream', votes: 0 }],
        },
      ]);
      await store.dispatch (actions.updatePoll ('0001', 'Treat',
        [{ text: 'Popsicle', votes: 0 }, { text: 'Blizzard', votes: 0 }]));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('delete poll', function () {
    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .delete ('/api/polls/0001')
        .reply (200, {});
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, []);

      const expectedActions = [
        { type: types.SET_POLLS, polls: [] },
      ];
      const store = mockStore ([
        {
          _id: '0001',
          creator: 'amy',
          title: 'Treat',
          choices: [{ text: 'Popsicle', votes: 0 }, { text: 'Ice Cream', votes: 0 }],
        },
      ]);
      await store.dispatch (actions.deletePoll ('0001'));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('vote', function () {
    const startPolls = [
      {
        _id: '1000',
        creator: 'amy',
        title: 'Poll a1',
        choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
      },
      {
        _id: '1001',
        creator: 'amy',
        title: 'Poll a2',
        choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
      },
      {
        _id: '1002',
        creator: 'bob',
        title: 'Poll b1',
        choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
      },
    ];
    const endPolls = [
      {
        _id: '1000',
        creator: 'amy',
        title: 'Poll a1',
        choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
      },
      {
        _id: '1001',
        creator: 'amy',
        title: 'Poll a2',
        choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 1 }],
      },
      {
        _id: '1002',
        creator: 'bob',
        title: 'Poll b1',
        choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
      },
    ];

    it ('should generate set polls action', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/polls/1001/votes/No')
        .reply (200, {});
      nock ('http://localhost:3999/')
        .get ('/api/polls')
        .reply (200, endPolls);

      const expectedActions = [
        { type: types.SET_POLLS, polls: endPolls },
      ];
      const store = mockStore (startPolls);
      await store.dispatch (actions.vote ('1001', 'No'));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });
});

describe ('Test poll reducers', function () {
  const initialState = freeze ([
    {
      _id: '1000',
      creator: 'amy',
      title: 'Poll a1',
      choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
    },
    {
      _id: '1001',
      creator: 'amy',
      title: 'Poll a2',
      choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
    },
    {
      _id: '1002',
      creator: 'bob',
      title: 'Poll b1',
      choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
    },
  ]);
  const newState = [
    {
      _id: '1000',
      creator: 'amy',
      title: 'Animals',
      choices: [{ text: 'Tigers', votes: 0 }, { text: 'Bears', votes: 0 }],
    },
    {
      _id: '1001',
      creator: 'amy',
      title: 'Yes No',
      choices: [{ text: 'Yes', votes: 0 }, { text: 'No', votes: 0 }],
    },
    {
      _id: '1002',
      creator: 'bob',
      title: 'Colors',
      choices: [{ text: 'Red', votes: 0 }, { text: 'Blue', votes: 0 }],
    },
  ];

  describe ('Reducer: default initialization', function () {
    it ('should return initial state', function () {
      const expectedObject = [];
      // eslint-disable-next-line no-undefined
      assert.deepStrictEqual (pollsReducer (undefined, {}), expectedObject);
    });
  });

  describe ('Reducer: SET_POLLS to initialState', function () {
    it ('should end in initialState', function () {
      const expectedObject = initialState;
      // eslint-disable-next-line no-undefined
      const actualObject = pollsReducer (undefined, {
        type: types.SET_POLLS,
        polls: initialState,
      });
      assert.deepStrictEqual (actualObject, expectedObject);
    });
  });

  describe ('Reducer: SET_POLLS from initialState to newState', function () {
    it ('should end in newState', function () {
      const expectedObject = newState;
      const actualObject = pollsReducer (initialState, {
        type: types.SET_POLLS,
        polls: newState,
      });
      assert.deepStrictEqual (actualObject, expectedObject);
    });
  });
});
