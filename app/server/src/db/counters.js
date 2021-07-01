// @ts-check
/**
  @typedef { import ('mongodb').Collection} mongodb.Collection
  @typedef { import ('mongodb').Db} mongodb.Db
*/

/** @type mongodb.Collection */
let c;

/**
 * Initialize collection
 * @param {mongodb.Db} db MongoDB db instance object
 * @returns {void}
 */
export function initCounters (db) {
  c = db.collection ('counters');
}

/**
 * Update counter (increment) and return new counter
 * @param {string} _id Counter name
 * @returns {Promise<number>} New counter value
 */
export async function getNextSequence (_id) {
  const t = await c.findOneAndUpdate (
    { _id },
    { $inc: { sequence: 1 } },
    { returnDocument: 'after' },
  );
  return t.value.sequence;
}
