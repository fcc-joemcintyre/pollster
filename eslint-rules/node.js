module.exports = {
  'env': {
    'node': true,
  },

  'rules': {
    // enforce return after a callback
    'callback-return': 'off',

    // enforce require() on the top-level module scope
    'global-require': 'error',

    // enforces error handling in callbacks (node environment)
    'handle-callback-err': 'off',

    // disallow mixing regular variable and require declarations
    'no-mixed-requires': 'error',

    // disallow use of new operator with the require function
    'no-new-require': 'error',

    // disallow string concatenation with __dirname and __filename
    'no-path-concat': 'off',

    // disallow use of process.env
    'no-process-env': 'off',

    // disallow process.exit()
    'no-process-exit': 'off',

    // restrict usage of specified node modules
    'no-restricted-modules': 'off',

    // disallow use of synchronous methods (off by default)
    'no-sync': 'off',
  },
};
