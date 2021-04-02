// @ts-check
import { isPassword } from '../src/isPassword.js';

test ('valid', () => {
  expect (isPassword ('abcdef')).toBe (null);
});

test ('invalid length', () => {
  expect (isPassword ('abc')).toBe ('length');
});

test ('invalid content', () => {
  expect (isPassword ('abc>def')).toBe ('format');
});
