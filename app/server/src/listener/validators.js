// @ts-check
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

const ajv = new Ajv ();
const dir = dirname (fileURLToPath (import.meta.url));

export const validateLogin = compile ('schema/login.json');
export const validatePoll = compile ('schema/poll.json');
export const validateRegister = compile ('schema/register.json');
export const validateProfile = compile ('schema/profile.json');

/**
 * Compile JSON schema
 * @param {string} schema Input schema
 * @returns {any} Schema processing interface
 */
function compile (schema) {
  const json = readFileSync (resolve (dir, schema), 'utf8');
  const t = JSON.parse (json);
  return ajv.compile (t);
}
