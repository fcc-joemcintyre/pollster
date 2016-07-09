'use strict';
import assert from 'assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as types from '../../src/client/account/store/constants';
import * as actions from '../../src/client/account/store/actions';
import userReducer from '../../src/client/account/store/user';

// set location global to mimic browser object
global.location = { origin: 'http://localhost:3999' };

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
        username
      };
      const action = actions.setAuthenticated (authenticated, username);
      assert.deepStrictEqual (expectedAction, action);
    });
  });

  describe ('ActionCreator: SET_PROFILE', function () {
    it ('should create action to set profile', function () {
      const name = 'Test';
      const email = 'test@example.com';
      const expectedAction = {
        type: types.SET_PROFILE,
        name,
        email
      };
      const action = actions.setProfile (name, email);
      assert.deepStrictEqual (expectedAction, action);
    });
  });
});

describe ('Test account async actions', function () {
  afterEach (function () {
    nock.cleanAll ();
  });

  describe ('login', function () {
    it ('should generate login actions', function () {
      nock ('http://localhost:3999/')
        .post ('/api/login', {username: 'amy', password: 'test'})
        .reply (200, {username: 'amy', name: '', email: ''});

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: true, username: 'amy' },
        { type: types.SET_PROFILE, name: '', email: '' }
      ];
      const store = mockStore ({});
      return store.dispatch (actions.login ('amy', 'test'))
      .then (function () {
        assert.deepStrictEqual (store.getActions (), expectedActions);
      });
    });
  });

  describe ('logout', function () {
    it ('should generate logout actions', function () {
      nock ('http://localhost:3999/')
        .post ('/api/logout')
        .reply (200, {});

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: false, username: '' }
      ];
      const store = mockStore ({});
      return store.dispatch (actions.logout ())
      .then (function () {
        assert.deepStrictEqual (store.getActions (), expectedActions);
      });
    });
  });

  describe ('verify login (logged in)', function () {
    it ('should generate logged in actions', function () {
      nock ('http://localhost:3999/')
        .get ('/api/verifylogin')
        .reply (200, {authenticated: true, user: {username: 'amy', name: 'Amy Tester', email: 'amy@example.com'}});

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: true, username: 'amy' },
        { type: types.SET_PROFILE, name: 'Amy Tester', email: 'amy@example.com' }
      ];
      const store = mockStore ({});
      return store.dispatch (actions.verifyLogin ())
      .then (function () {
        assert.deepStrictEqual (store.getActions (), expectedActions);
      });
    });
  });

  describe ('verify login (not logged in)', function () {
    it ('should generate not logged in actions', function () {
      nock ('http://localhost:3999/')
        .get ('/api/verifylogin')
        .reply (200, {authenticated: false, user: null});

      const expectedActions = [
        { type: types.SET_AUTHENTICATED, authenticated: false, username: '' },
        { type: types.SET_PROFILE, name: '', email: '' }
      ];
      const store = mockStore ({});
      return store.dispatch (actions.verifyLogin ())
      .then (function () {
        assert.deepStrictEqual (store.getActions (), expectedActions);
      });
    });
  });

  describe ('update user profile', function () {
    it ('should generate update actions', function () {
      nock ('http://localhost:3999/')
        .post ('/api/profile', {
          name: 'New name',
          email: 'new@example.com'
        })
        .reply (200, {});

      const expectedActions = [
        { type: types.SET_PROFILE, name: 'New name', email: 'new@example.com' }
      ];
      const store = mockStore ({user: {
        authenticated: true,
        username: 'amy',
        name: 'Amy Tester',
        email: 'amy@example.com'
      }});
      return store.dispatch (actions.updateProfile ('New name', 'new@example.com'))
      .then (function () {
        assert.deepStrictEqual (store.getActions (), expectedActions);
      });
    });
  });
});

describe ('Test user reducers', function () {
  const defaultInitialState = Object.freeze ({
    authenticated: false,
    username: '',
    name: '',
    email: ''
  });

  describe ('Reducer: default initialization', function () {
    it ('should return initial state', function () {
      const expectedObject = {
        authenticated: false,
        username: '',
        name: '',
        email: ''
      };
      assert.deepStrictEqual (userReducer (undefined, {}), expectedObject);
    });
  });

  describe ('Reducer: SET_AUTHENTICATED', function () {
    it ('should create action to set authentication', function () {
      const expectedObject = {
        authenticated: true,
        username: 'amy',
        name: '',
        email: ''
      };
      const actualObject = userReducer (defaultInitialState, {
        type: types.SET_AUTHENTICATED,
        authenticated: true,
        username: 'amy'
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
        email: 'amy@example.com'
      };
      const actualObject = userReducer (defaultInitialState, {
        type: types.SET_PROFILE,
        name: 'Amy Tester',
        email: 'amy@example.com'
      });
      assert.deepStrictEqual (actualObject, expectedObject);
    });
  });
});