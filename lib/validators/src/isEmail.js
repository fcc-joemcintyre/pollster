// @ts-check

/**
 * Is valid email address
 * @param {string} value String to validate
 * @returns {'format' | null} Error (format) or null if valid
 */
export function isEmail (value) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test (value) ? null : 'format';
}
