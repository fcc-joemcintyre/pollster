import { PropTypes } from 'react';

// constructor function to create a new field
export function createField (name, initialValue, validators) {
  return {
    name,
    initialValue,
    value: initialValue,
    touched: false,
    validators,
    error: null,
  };
}

// constructor function to run initial validation to populate fields
export function preValidate (fields) {
  Object.keys (fields).forEach ((field) => {
    fields[field].error = validateField (fields[field]);
  });
}

// setState function to update a field
export function updateFieldValue (field, value) {
  return function updateValue (prev) {
    return ({
      fields: Object.assign (prev.fields, {
        [field.name]: Object.assign ({}, prev.fields[field.name], { value }),
      }),
    });
  };
}

// setState function to update validation for a field
export function updateFieldValidation (field) {
  return function updateError (prev) {
    return ({
      fields: Object.assign (prev.fields, {
        [field.name]: Object.assign ({}, prev.fields[field.name], {
          touched: true,
          error: validateField (field),
        }),
      }),
    });
  };
}

// setState function, reset a field
export function getResetObject (field) {
  return function update (prev) {
    return ({
      fields: Object.assign (prev.fields, {
        [field.name]: Object.assign ({}, prev.fields[field.name], {
          value: prev.fields[field.name].initialValue,
          touched: false,
          error: validateField (field) }),
      }),
    });
  };
}

// validate all fields (returning object that can be passed to setState)
export function validateAll (fields) {
  const updates = Object.assign ({}, fields);
  Object.keys (fields).forEach ((field) => {
    updates[field] = Object.assign ({}, updates[field], { error: validateField (fields[field]) });
  });
  return updates;
}

// validate a field, returning error text (or null if no error)
export function validateField (field) {
  return validate (field.validators, field.value);
}

// private function to run validators in static or updating context
function validate (validators, value) {
  let error = null;
  if (validators && (validators.length > 0)) {
    for (let c = 0; c < validators.length; c ++) {
      if (validators[c].fn (value) === false) {
        error = validators[c].text;
        break;
      }
    }
  }
  return error;
}

// setState function to reset all fields (pass to setState)
export function resetAll (prevState) {
  let updates = prevState.fields;
  Object.keys (prevState.fields).forEach ((field) => {
    updates = Object.assign (updates, { [field]: {
      value: prevState.fields[field].initialValue,
      touched: false,
      error: validate (prevState.fields[field].validators, prevState.fields[field].initialValue),
    } });
  });
  return Object.assign ({}, prevState, { fields: updates });
}

// PropTypes to provide for field elements in form components
export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.shape ({ fn: PropTypes.func, text: PropTypes.string })).isRequired,
  error: PropTypes.string,
};
