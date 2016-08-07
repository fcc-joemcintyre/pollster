/* eslint prefer-arrow-callback: off */
/* eslint global-require: off */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// establish global fetch objects to mimic browser variables
import 'isomorphic-fetch';

describe ('test-main', function () {
  describe ('test-account', function () {
    require ('./test-account');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
