import { expect } from 'earljs';
import { Db } from 'mongodb';
import { initDatabase, closeDatabase } from '../src/db/db.js';
import { initCounters, getNextSequence } from '../src/db/counters.js';
import { initUsers, registerUser } from '../src/db/users.js';

let db: Db | null;

describe ('db / counters', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
      const c = db.collection ('counters');
      await c.deleteMany ({});
      initCounters (db);
    }
  });

  after (() => {
    closeDatabase ();
  });

  describe ('initial counter', function () {
    it ('should create new counter with value 1', async function () {
      const key = await getNextSequence ('test');
      expect (key).toEqual (1);
    });
  });

  describe ('increment counter', function () {
    it ('counter value should be 2', async function () {
      const key = await getNextSequence ('test');
      expect (key).toEqual (2);
    });
  });
});

describe ('db / users', function () {
  before (async () => {
    db = await initDatabase ('mongodb://localhost:27018/pollster');
    if (db) {
      const c1 = db.collection ('counters');
      await c1.deleteMany ({});
      const c2 = db.collection ('users');
      await c2.deleteMany ({});
      await c2.createIndex ({ email: 1 }, { unique: true, name: 'email' });
      initCounters (db);
      initUsers (db);
    }
  });

  after (() => {
    closeDatabase ();
  });

  describe ('register user', function () {
    it ('should create new user', async function () {
      const r = await registerUser ('amy@example.com', 'Amy Smith', 'test');
      expect (r.status).toEqual (200);
      expect (r.user?.email).toEqual ('amy@example.com');
      expect (r.user?.name).toEqual ('Amy Smith');
    });
  });

  describe ('register user error', function () {
    it ('duplicate should error', async function () {
      const r = await registerUser ('amy@example.com', 'Amy Smith', 'test');
      expect (r.status).toEqual (409);
    });
  });
});
