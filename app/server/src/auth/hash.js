// @ts-check
import * as crypto from 'crypto';

/**
  @typedef { import ('../types/app').Hash} Hash
*/

/**
 * Following recommendations of NIST for PBDKF2 implementation
 * http://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
 *  - salt length of 128 bits, SHA-512 algorithm, 512 bit keylen
 */

/**
 * Create a hash and salt for a provided password
 * @param {string} password Password to generate hash from
 * @returns {Hash} Hash object
 */
export function createHash (password) {
  const salt = crypto.randomBytes (16).toString ('hex');
  const hash = crypto.pbkdf2Sync (password, salt, 2000, 64, 'sha512').toString ('hex');
  return { salt, hash };
}

/**
 * Compare provided password with previously generated hash
 * @param {string} password Password to compare with
 * @param {string} hash Previously generated hash
 * @param {string} salt Previously generated salt
 * @returns {boolean} Compare result
 */
export function compareHash (password, hash, salt) {
  const key = crypto.pbkdf2Sync (password, salt, 2000, 64, 'sha512').toString ('hex');
  return hash === key;
}
