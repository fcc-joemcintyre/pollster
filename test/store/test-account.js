import assert from 'assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as types from '../../src/client/store/userConstants';
import * as actions from '../../src/client/store/userActions';
import userReducer from '../../src/client/store/user';

const middleware = [thunk];
const mockStore = configureMockStore (middleware);

describe ('Test account action creators', function () {
  describe ('ActionCreator: SET_AUTHENTICATED', function () {
    it ('should create action to set authentication', function () {
      const authenticated = true;
      const username = 'Test';
      const expectedAction = {
        type: types.SET_AUTHENTICATED,
        authenticated,
        username,
      };
      const action = actions.setAuthenticated (authenticated, username);
      assert.deepStrictEqual (expectedAction, action);
    });
  });

  describe ('ActionCreator: SET_PROFILE', function () {
    it ('should create action to set profile', function () {
      const name = 'Test';
      const email = 'test@example.com';
      const theme = 'gray';
      const expectedAction = {
        type: types.SET_PROFILE,
        name,
        email,
        theme,
      };
      const action = actions.setProfile (name, email, theme);
      assert.deepStrictEqual (expectedAction, action);
    });
  });
});

describe ('Test account async actions', function () {
  afterEach (function () {
    nock.cleanAll ();
  });

  describe ('login', function () {
    it ('should generate login actions', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/login', { username: 'amy', password: 'test' })
        .reply (200, { username: 'amy', name: 'Amy Tester', email: 'amy@example.com', theme: 'base' });

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: true, username: 'amy' },
        { type: types.SET_PROFILE, name: 'Amy Tester', email: 'amy@example.com', theme: 'base' },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.login ('amy', 'test'));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('logout', function () {
    it ('should generate logout actions', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/logout')
        .reply (200, {});

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: false, username: '' },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.logout ());
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('verify login (logged in)', function () {
    it ('should generate logged in actions', async function () {
      nock ('http://localhost:3999/')
        .get ('/api/verifylogin')
        .reply (200, {
          authenticated: true,
          user: { username: 'amy', name: 'Amy Tester', email: 'amy@example.com', theme: 'base' },
        });

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: true, username: 'amy' },
        { type: types.SET_PROFILE, name: 'Amy Tester', email: 'amy@example.com', theme: 'base' },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.verifyLogin ());
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('verify login (not logged in)', function () {
    it ('should generate not logged in actions', async function () {
      nock ('http://localhost:3999/')
        .get ('/api/verifylogin')
        .reply (200, { authenticated: false, user: null });

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: false, username: '' },
        { type: types.SET_PROFILE, name: '', email: '', theme: 'base' },
      ];
      const store = mockStore ({});
      await store.dispatch (actions.verifyLogin ());
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });

  describe ('update user profile', function () {
    it ('should generate update actions', async function () {
      nock ('http://localhost:3999/')
        .post ('/api/profile', {
          name: 'New name',
          email: 'new@example.com',
          theme: 'gray',
        })
        .reply (200, {});

      const expectedActions = [
        { type: types.SET_PROFILE, name: 'New name', email: 'new@example.com', theme: 'gray' },
      ];
      const store = mockStore ({
        user: {
          authenticated: true,
          username: 'amy',
          name: 'Amy Tester',
          email: 'amy@example.com',
          theme: 'gray',
        },
      });
      await store.dispatch (actions.updateProfile ('New name', 'new@example.com', 'gray'));
      assert.deepStrictEqual (store.getActions (), expectedActions);
    });
  });
});

describe ('Test user reducers', function () {
  const defaultInitialState = Object.freeze ({
    authenticated: false,
    username: '',
    name: '',
    email: '',
    theme: '',
  });

  describe ('Reducer: default initialization', function () {
    it ('should return initial state', function () {
      const expectedObject = {
        authenticated: false,
        username: '',
        name: '',
        email: '',
        theme: '',
      };
      // eslint-disable-next-line no-undefined
      assert.deepStrictEqual (userReducer (undefined, {}), expectedObject);
    });
  });

  describe ('Reducer: SET_AUTHENTICATED', function () {
    it ('should create action to set authentication', function () {
      const expectedObject = {
        authenticated: true,
        username: 'amy',
        name: '',
        email: '',
        theme: '',
      };
      const actualObject = userReducer (defaultInitialState, {
        type: types.SET_AUTHENTICATED,
        authenticated: true,
        username: 'amy',
      });
      assert.deepStrictEqual (actualObject, expectedObject);
    });
  });

  describe ('Reducer: SET_PROFILE', function () {
    it ('should create action to set profile', function () {
      const expectedObject = {
        authenticated: false,
        username: '',
        name: 'Amy Tester',
        email: 'amy@example.com',
        theme: 'gray',
      };
      const actualObject = userReducer (defaultInitialState, {
        type: types.SET_PROFILE,
        name: 'Amy Tester',
        email: 'amy@example.com',
        theme: 'gray',
      });
      assert.deepStrictEqual (actualObject, expectedObject);
    });
  });
});
