// @ts-check
import * as PropTypes from 'prop-types';
import { createField } from './src/helpers.js';
import {
  inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray,
} from './src/formatters.js';
import { useFields } from './src/useFields.js';

/** PropTypes for fields passed into forms */
export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  formatOut: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
};

export const fieldArrayPropTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.arrayOf (PropTypes.any).isRequired,
  value: PropTypes.arrayOf (PropTypes.any).isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  formatOut: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
};

/** JSDoc types
  @typedef {Object} Field
  @property {string} name
  @property {boolean | number | string | Date | null} initial
  @property {boolean | number | string | Date | null} value
  @property {boolean} required
  @property {Function[]} validators
  @property {Function} formatOut
  @property {string} error
  @property {boolean} touched

  @typedef {Object} FieldArray
  @property {string} name
  @property {boolean[] | number[] | string[] | Date[] | null} initial
  @property {boolean[] | number[] | string[] | Date[] | null} value
  @property {boolean} required
  @property {Function[]} validators
  @property {Function} formatOut
  @property {string} error
  @property {boolean} touched
*/

export {
  createField, inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray, useFields,
};
