// @ts-check
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

/**
 * @typedef {Ajv.ValidateFunction} ValidateFunction
 */

const ajv = new Ajv ();
// @ts-ignore
const t = fileURLToPath (import.meta.url);
const dir = dirname (t);

export const validateLogin = compile ('schema/login.json');
export const validatePoll = compile ('schema/poll.json');
export const validateRegister = compile ('schema/register.json');
export const validateProfile = compile ('schema/profile.json');

/**
 * Compile JSON schema
 * @param {string} schema Input schema
 * @returns {ValidateFunction} Schema processing interface
 */
function compile (schema) {
  return ajv.compile (readFileSync (resolve (dir, schema)));
}
