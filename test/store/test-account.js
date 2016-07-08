'use strict';
import assert from 'assert';
import * as types from '../../src/client/account/store/constants';
import * as actions from '../../src/client/account/store/actions';

describe ('Test account', function () {
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
