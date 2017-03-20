export function isNotEmpty (value) {
  return (value.trim ().length > 0);
}

export function isLengthValid (min, max) {
  return function checkLength (value) {
    const length = value.trim ().length;
    return ((min <= length) && (length <= max));
  };
}

export function isValidEmail (value) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test (value);
}

export function isEmptyOrValidEmail (value) {
  return (value === '') || isValidEmail (value);
}

export function isValidPassword (value) {
  return (value.length > 3) && /([A-Za-z0-9!@#$%^&*-+_=])+/.test (value);
}
