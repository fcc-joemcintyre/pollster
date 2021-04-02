// @ts-check

/**
 * Is valid password (minimum 4 characters, no spaces)
 * @param {string} value String to validate
 * @returns {'format' | 'length' | null} Error string or null if valid
 */
export function isPassword (value) {
  if (value.length < 4) {
    return 'length';
  } else {
    return /^([A-Za-z0-9!@#$%^&*-+_=])+$/.test (value) ? null : 'format';
  }
}
