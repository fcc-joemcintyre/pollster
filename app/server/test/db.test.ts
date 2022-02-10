import { expect } from 'earljs';
import { Db } from 'mongodb';
import { initDatabase, closeDatabase } from '../src/db/db.js';
import { initCounters, getNextSequence } from '../src/db/counters.js';

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
