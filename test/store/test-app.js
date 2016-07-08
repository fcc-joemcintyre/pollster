'use strict';
import assert from 'assert';
import * as types from '../../src/client/main/store/constants';
import * as actions from '../../src/client/main/store/actions';

describe ('Test app', function () {
  describe ('ActionCreator: SET_POLLS', function () {
    it ('should create action to set polls', function () {
      const polls = [];
      const expectedAction = {
        type: types.SET_POLLS,
        polls
      };
      const action = actions.setPolls (polls);
      assert.deepStrictEqual (expectedAction, action);
    });
  });
});
