/* eslint-env jest */
import { init, reducer } from '../src/useFieldsReducer';
import { createField } from '../src/helpers';

const field1 = createField ('field1', 'A');
const field2 = createField ('field2', 'B');
const base = init ([field1, field2]);

test ('Verify initial base objects', () => {
  expect (base).toEqual ({
    field1: {
      name: 'field1',
      initial: 'A',
      required: false,
      validators: [],
      formatOut: undefined,
      value: 'A',
      touched: false,
      error: null,
    },
    field2: {
      name: 'field2',
      initial: 'B',
      required: false,
      validators: [],
      formatOut: undefined,
      value: 'B',
      touched: false,
      error: null,
    },
  });
});

test ('reducer: set value', () => {
  const action = { type: 'value', name: 'field2', value: 'C' };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
      value: 'C',
    },
  });
});

test ('reducer: set required (true)', () => {
  const action = { type: 'required', name: 'field2', value: true };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
      required: true,
    },
  });
});

test ('reducer: set required (false)', () => {
  const action = { type: 'required', name: 'field2', value: false };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
      required: false,
    },
  });
});

test ('reducer: set single field error', () => {
  const action = { type: 'error', name: 'field2', error: 'required' };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
      error: 'required',
    },
  });
});

test ('reducer: set multiple field errors', () => {
  const action = {
    type: 'errors',
    errors: [
      { name: 'field1', error: 'error1' },
      { name: 'field2', error: 'error2' },
    ],
  };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
      error: 'error1',
    },
    field2: {
      ...field2,
      error: 'error2',
    },
  });
});

test ('reducer: set single touched', () => {
  const action = { type: 'touched', name: 'field2', value: true };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
      touched: true,
    },
  });
});

test ('reducer: replace fields', () => {
  const field3 = createField ('field3', 'C');
  const field4 = createField ('field4', 'D');

  const action = { type: 'set', data: init ([field3, field4]) };
  expect (reducer (base, action)).toEqual ({
    field3: {
      ...field3,
    },
    field4: {
      ...field4,
    },
  });
});

test ('reducer: add field', () => {
  const field3 = createField ('field3', 'C');

  const action = { type: 'addfield', field: field3 };
  expect (reducer (base, action)).toEqual ({
    field1: {
      ...field1,
    },
    field2: {
      ...field2,
    },
    field3: {
      ...field3,
    },
  });
});

test ('reducer: remove field', () => {
  const action = { type: 'removefield', field: field1.name };
  expect (reducer (base, action)).toEqual ({
    field2: {
      ...field2,
    },
  });
});

test ('reducer: remove field that does not exist makes no changes', () => {
  const action = { type: 'removefield', field: 'notafield' };
  expect (reducer (base, action)).toEqual (base);
});

test ('reducer: remove null field makes no changes', () => {
  const action = { type: 'removefield', field: null };
  expect (reducer (base, action)).toEqual (base);
});

test ('invalid action makes no changes', () => {
  const action = { type: 'notanaction', value: 'C' };
  expect (reducer (base, action)).toEqual (base);
});
