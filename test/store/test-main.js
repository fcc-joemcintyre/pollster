/* eslint global-require: off */

// establish global fetch objects to mimic browser variables
import 'isomorphic-fetch';

global.window = { location: { origin: 'http://localhost:3999' } };

describe ('test-main', function () {
  describe ('test-account', function () {
    require ('./test-account');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
