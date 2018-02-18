import PropTypes from 'prop-types';

export function createField (name, initialValue = '', required = false, validators = [],
  formatIn = null, formatOut = null) {
  const field = {
    name,
    initialValue,
    value: initialValue,
    required,
    validators,
    error: null,
    formatIn,
    formatOut,
  };
  return field;
}

export function validateField (field) {
  const hasContent = (((typeof field.value === 'string') && (field.value.trim () !== '')) ||
    ((Array.isArray (field.value)) && (field.value.length !== 0)));
  if ((field.required === false) && (hasContent === false)) {
    return null;
  }
  if (field.required && (hasContent === false)) {
    return 'required';
  }

  let error = null;
  if (field.validators && (field.validators.length > 0)) {
    const value = field.formatOut ? field.formatOut (field.value) : field.value;
    for (let c = 0; c < field.validators.length; c ++) {
      error = field.validators[c] (value);
      if (error) { break; }
    }
  }
  return error;
}

export function getFieldValues (fields) {
  const result = {};
  for (const key of Object.keys (fields)) {
    if (Array.isArray (fields[key])) {
      for (const a of [fields[key]]) {
        result[a.name] = a.formatOut ? a.formatOut (a.value) : a.value;
      }
    } else {
      const a = fields[key];
      result[key] = a.formatOut ? a.formatOut (a.value) : a.value;
    }
  }
  return result;
}

/**
 * Return name of first field with an error (or null if no errors).
 * @param {Object} fields Fields Object
 * @returns {string} Name of field, or null if no errors
 */
export function getFirstError (fields) {
  for (const value of Object.values (fields)) {
    if (value.error) {
      return value.name;
    }
  }
  return null;
}

export function inString (value = '') {
  return value.trim ();
}

export function outString (value = '') {
  return value.trim ();
}

export function inDate (value = '') {
  let date;
  if (value && ((value instanceof Date) || (Object.prototype.toString.call (value) === '[object Date]'))) {
    if (! Number.isNaN (value.getTime ())) {
      date = value;
    }
  } else if (value && (typeof (value) === 'string')) {
    const temp = new Date (value);
    if (! Number.isNaN (temp.getTime ())) {
      date = temp;
    }
  }
  return (date) ? `${date.getUTCMonth () + 1}/${date.getUTCDate ()}/${date.getUTCFullYear ()}` : '';
}

export function outDate (value = '') {
  return (value === '') ? '' : new Date (value);
}

export function inInteger (value = 0) {
  return value.toString ();
}

export function outInteger (value = 0) {
  if (value === '') {
    return 0;
  }
  let n = Number (value);
  if (Number.isNaN (n)) {
    n = 0;
  } else {
    n = Math.floor (n);
  }
  return n;
}

export function inIntegerArray (value = []) {
  return value.map (inInteger);
}

export function outIntegerArray (value = []) {
  return value.map (a => outInteger (a));
}

export function inCurrency (value = 0) {
  return value.toString ();
}

export function outCurrency (value) {
  return (value === '') ? 0 : parseInt (value.replace (/[$,]/g, ''), 10);
}

export function inBoolean (value = false) {
  return (typeof (value) === 'boolean') ? 'true' : 'false';
}

export function outBoolean (value = 'true') {
  return value === 'true';
}

export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  errors: PropTypes.string,
};

export const fieldArrayPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.arrayOf (PropTypes.string).isRequired,
  value: PropTypes.arrayOf (PropTypes.string).isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  errors: PropTypes.string,
};
