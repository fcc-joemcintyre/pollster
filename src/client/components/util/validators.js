export function isNotEmpty (value) {
  return (value.trim ().length !== 0) ? null : 'format';
}

export function isLengthValid (min, max) {
  return function checkLength (value) {
    const length = value.trim ().length;
    return ((min <= length) && (length <= max));
  };
}

export function isEmail (value) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test (value) ? null : 'format';
}

export function isPassword (value) {
  if (value.length < 4) {
    return 'length';
  } else {
    return /([A-Za-z0-9!@#$%^&*-+_=])+/.test (value) ? null : 'format';
  }
}
