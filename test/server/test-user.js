const jsonFetch = require ('../util/jsonFetch');
const JsonFetchError = require ('../util/JsonFetchError');

describe ('login/logout/register', function () {
  describe ('valid login await jsonFetch', function () {
    it ('should return valid login', async function () {
      const input = { username: 'amy', password: 'test' };
      await jsonFetch.post ('/api/login', input);
    });
  });

  describe ('invalid login await jsonFetch', function () {
    it ('should return 401 error', async function () {
      const input = { username: 'notauser', password: 'test' };
      try {
        await jsonFetch.post ('/api/login', input);
        throw new JsonFetchError (200, 'Invalid status');
      } catch (err) {
        if (err.status !== 401) {
          throw new Error ('Invalid status');
        }
      }
    });
  });

  describe ('valid login and logout await jsonFetch', function () {
    it ('should have no errors', async function () {
      const input = { username: 'amy', password: 'test' };
      await jsonFetch.post ('/api/login', input);
      await jsonFetch.post ('/api/logout');
    });
  });

  describe ('check authentication for logged in user', function () {
    before (async function () {
      const input = { username: 'amy', password: 'test' };
      await jsonFetch.post ('/api/login', input);
    });

    after (async function () {
      await jsonFetch.post ('/api/logout');
    });

    it ('should have no errors', async function () {
      const data = await jsonFetch.get ('/api/verifylogin');
      if (data.authenticated !== true) {
        throw new Error ('Invalid login data');
      }
    });
  });

  describe ('check authentication for no logged in user', function () {
    it ('should return false with no errors', async function () {
      const data = await jsonFetch.get ('/api/verifylogin');
      if (data.authenticated !== false) {
        throw new Error ('Invalid login data');
      }
    });
  });

  describe ('register, login and logout', function () {
    it ('should have no errors', async function () {
      const input = { username: 'newuser', password: 'test' };
      await jsonFetch.post ('/api/register', input);
      await jsonFetch.post ('/api/login', input);
      await jsonFetch.post ('/api/logout');
    });
  });

  describe ('register same user twice', function () {
    it ('should fail on second register call', async function () {
      const input = { username: 'newuser2', password: 'test' };
      await jsonFetch.post ('/api/register', input);
      try {
        await jsonFetch.post ('/api/register', input);
        throw new JsonFetchError (200, 'invalid status');
      } catch (err) {
        if (err.status !== 403) {
          throw new Error ('invalid status');
        }
      }
    });
  });
});

describe ('profile', function () {
  beforeEach (async function () {
    const input = { username: 'amy', password: 'test' };
    await jsonFetch.post ('/api/login', input);
  });

  afterEach (async function () {
    await jsonFetch.post ('/api/logout');
  });

  describe ('get initial profile', function () {
    it ('should have no errors', async function () {
      const data = await jsonFetch.get ('/api/profile');
      if ((data.name !== '') || (data.email !== '')) {
        throw new Error (`Invalid data ${JSON.stringify (data)}`);
      }
    });
  });

  describe ('update profile', function () {
    it ('should have no errors', async function () {
      const input = { name: 'Test', email: 'test@example.com' };
      await jsonFetch.post ('/api/profile', input);
      const data = await jsonFetch.get ('/api/profile');
      if ((data.name !== 'Test') || (data.email !== 'test@example.com')) {
        throw new Error (`Invalid data ${JSON.stringify (data)}`);
      }
    });
  });
});

describe ('REST call validation', function () {
  /* eslint object-property-newline: off */
  const tests = [
    { name: 'login empty', uri: '/api/login', data: {}, status: 400 },
    { name: 'login username', uri: '/api/login', data: { username: 'username' }, status: 400 },
    { name: 'login password', uri: '/api/login', data: { password: 'password' }, status: 400 },
    { name: 'login extra', uri: '/api/login', data: { username: 'username', password: 'password', extra: 'extra' },
      status: 400 },
    { name: 'login username length', uri: '/api/login',
      data: { username: 'usernameistoolongtpplomg', password: 'password' }, status: 400 },
    { name: 'login password length', uri: '/api/login',
      data: { username: 'username', password: 'passwordistoolongtoolong' }, status: 400 },
    { name: 'register empty', uri: '/api/register', data: {}, status: 400 },
    { name: 'register username', uri: '/api/register', data: { username: 'username' }, status: 400 },
    { name: 'register password', uri: '/api/register', data: { password: 'password' }, status: 400 },
    { name: 'register extra', uri: '/api/register', data: { username: 'username', password: 'password', extra: 'extra' },
      status: 400 },
    { name: 'register username length', uri: '/api/register',
      data: { username: 'usernameistoolongtpplomg', password: 'password' }, status: 400 },
    { name: 'register password length', uri: '/api/register',
      data: { username: 'username', password: 'passwordistoolongtoolong' }, status: 400 },
  ];

  tests.forEach (function (test) {
    it (`${test.name} status should be ${test.status}`, async function () {
      try {
        await jsonFetch.post ('/api/login', {});
        throw new JsonFetchError (0);
      } catch (err) {
        if (err.status !== test.status) {
          throw new Error ('invalid status');
        }
      }
    });
  });
});
