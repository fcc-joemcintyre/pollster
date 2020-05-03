/* global fetch window: true */
import { setupBefore, setupAfter } from './setup.js';

describe ('page loading', function () {
  before (async function () {
    await setupBefore ();
  });

  after (async function () {
    await setupAfter ();
  });

  describe ('/', function () {
    it ('should return 200 with home page', async function () {
      const res = await fetch (`${window.location.origin}/`);
      if (res.status === 200) {
        const text = await res.text ();
        if (text.indexOf ('<title>Pollster</title>') === -1) {
          throw new Error ('Invalid body');
        }
      } else {
        throw new Error ('Invalid response', res.status);
      }
    });
  });

  describe ('invalid URL content', function () {
    it ('should return 200 with home page', async function () {
      const res = await fetch (`${window.location.origin}/dummy`);
      if (res.status === 200) {
        const text = await res.text ();
        if (text.indexOf ('<title>Pollster</title>') === -1) {
          throw new Error ('Invalid body');
        }
      } else {
        throw new Error ('Invalid response', res.statusCode);
      }
    });
  });
});
