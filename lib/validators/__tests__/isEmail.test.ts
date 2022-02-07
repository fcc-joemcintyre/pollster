import { isEmail } from '../lib/isEmail.js';

test ('valid', () => {
  expect (isEmail ('john@example.com')).toBe (null);
});

test ('invalid', () => {
  expect (isEmail ('john@example.c')).toBe ('format');
});
