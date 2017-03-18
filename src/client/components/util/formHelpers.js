import { PropTypes } from 'react';

export function createField (name, initialValue, validators) {
  return {
    name,
    initialValue,
    value: initialValue,
    validators,
    error: validateField (initialValue),
  };
}

export function resetField (field) {
  return Object.assign ({}, field, {
    value: field.initialValue,
    error: validateField (field.initialValue),
  });
}

export function validateField (field) {
  let error = null;
  if (field.validators && (field.validators.length > 0)) {
    for (let c = 0; c < field.validators.length; c ++) {
      if (field.validators[c] (field.value) === false) {
        error = field.validators[c].name;
        break;
      }
    }
  }
  return error;
}

export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  errors: PropTypes.string,
};
