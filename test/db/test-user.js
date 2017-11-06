const db = require ('../../dist/db');
const expect = require ('chai').expect;

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
      expect (user).to.be.an ('object');
      expect (user.username).to.equal ('amy');
    });
  });

  describe ('find amyy', function () {
    it ('should not be found', async function () {
      const user = await db.findUserByUsername ('amyy');
      expect (user).to.equal (null);
    });
  });

  describe ('update amy', function () {
    it ('should have new name and email', async function () {
      await db.updateUser ('amy', 'Amy Test', 'amy@example.com');
      const user = await db.findUserByUsername ('amy');
      expect (user).to.be.an ('object');
      expect (user.name).to.equal ('Amy Test');
      expect (user.email).to.equal ('amy@example.com');
    });
  });
});
