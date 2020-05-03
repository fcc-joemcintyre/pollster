import chai from 'chai';
import mongodb from 'mongodb';
import * as db from '../../dist/db.js';

const expect = chai.expect;
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017/pollsterTest';

describe ('users', function () {
  before (async function () {
    // reset database
    const client = await MongoClient.connect (uri, { useNewUrlParser: true });
    const dbReset = client.db ();
    const users = dbReset.collection ('users');
    await users.deleteMany ();
    await client.close ();

    // initialize database for test cases
    await db.init (uri);
  });

  after (async function () {
    await db.close ();
  });

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
