const db = require ('../../dist/db');

describe ('users', function () {
  beforeEach (async function () {
    await db.insertUser ('amy', 'test');
  });

  afterEach (async function () {
    await db.removeUser ('amy');
  });

  describe ('find amy', function () {
    it ('should be found', async function () {
      const user = await db.findUserByUsername ('amy');
      if (! user) {
        throw new Error ('not found');
      }
    });
  });

  describe ('find amyy', function () {
    it ('should not be found', async function () {
      const user = await db.findUserByUsername ('amyy');
      if (user) {
        throw new Error ('should not be found');
      }
    });
  });

  describe ('update amy', function () {
    it ('should have new name and email', async function () {
      await db.updateUser ('amy', 'Amy Test', 'amy@example.com');
      const user = await db.findUserByUsername ('amy');
      if ((user.name !== 'Amy Test') || (user.email !== 'amy@example.com')) {
        throw new Error ('update failed');
      }
    });
  });
});
