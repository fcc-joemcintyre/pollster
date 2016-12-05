module.exports = {
  'rules': {
    // enforce spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],

    // disallow or enforce spaces inside of single line blocks
    'block-spacing': ['error', 'always'],

    // enforce one true brace style
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

    // enforce or disallow capitalization of the first letter of a comment
    'capitalize-comments': 'off',

    // require camel case names
    'camelcase': ['error', { properties: 'never' }],

    // enforce spacing before and after comma
    'comma-spacing': ['error', { before: false, after: true }],

    // enforce one true comma style
    'comma-style': ['error', 'last'],

    // require or disallow padding inside computed properties
    'computed-property-spacing': ['error', 'never'],

    // enforces consistent naming when capturing the current execution context
    'consistent-this': ['error', 'self'],

    // enforce newline at the end of file, with no multiple empty lines
    'eol-last': ['error', 'always'],

    // enforce spacing between functions and their invocations
    'func-call-spacing': ['error', 'always'],

    // requires function names to match the name of the variable or property to which they are assigned
    'func-name-matching': ['off', 'always', {
      includeCommonJSModuleExports: false,
    }],

    // require function expressions to have a name
    'func-names': 'off',

    // enforces use of function declarations or expressions
    'func-style': ['off', 'expression'],

    // disallow specified identifiers
    'id-blacklist': 'off',

    // enforce minimum and maximum identifier lengths
    'id-length': 'off',

    // require identifiers to match the provided regular expression
    'id-match': 'off',

    // this option sets a specific tab width for your code
    'indent': ['error', 2, { 'SwitchCase': 1 }],

    // specify whether double or single quotes should be used in JSX attributes
    'jsx-quotes': ['error', 'prefer-single'],

    // enforces spacing between keys and values in object literal properties
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],

    // enforce consistent spacing before and after keywords
    'keyword-spacing': ['error', { 'before': true, 'after': true }],

    // disallow mixed 'LF' and 'CRLF' as linebreaks
    'linebreak-style': ['error', 'unix'],

    // enforce position of line comments
    'line-comment-position': ['warn', { position: 'above' }],

    // enforces empty lines around comments
    'lines-around-comment': 'off',

    // require or disallow newlines around directives
    'lines-around-directive': ['error', { 'before': 'never', 'after': 'always' }],

    // specify the maximum depth that blocks can be nested
    'max-depth': ['off', 4],

    // specify the maximum length of a line in your program
    'max-len': ['error', 120, 2, {
      'ignoreUrls': true,
      'ignoreComments': false,
      'ignoreRegExpLiterals': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
    }],

    // specify the max number of lines in a file
    'max-lines': 'off',

    // specify the maximum depth callbacks can be nested
    'max-nested-callbacks': 'off',

    // limits the number of parameters that can be used in the function declaration.
    'max-params': 'off',

    // specify the maximum number of statement allowed in a function
    'max-statements': 'off',

    // enforce a maximum number of statements allowed per line
    'max-statements-per-line': 'off',

    // require multiline ternary
    'multiline-ternary': 'off',

    // require a capital letter for constructors
    'new-cap': 'error',

    // disallow the omission of parentheses when invoking a constructor with no arguments
    'new-parens': 'error',

    // allow/disallow an empty newline after var statement
    'newline-after-var': 'off',

    // require newline before return statement
    'newline-before-return': 'off',

    // require a newline after each call in a method chain
    'newline-per-chained-call': 'off',

    // disallow use of the Array constructor
    'no-array-constructor': 'error',

    // disallow use of bitwise operators
    'no-bitwise': 'error',

    // disallow use of the continue statement
    'no-continue': 'error',

    // disallow comments inline after code
    'no-inline-comments': 'off',

    // disallow if as the only statement in an else block
    'no-lonely-if': 'error',

    // disallow un-paren'd mixes of different operators
    'no-mixed-operators': ['error', {
      groups: [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      allowSamePrecedence: false,
    }],

    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': 'error',

    // disallow multiple empty lines and only one newline at the end
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],

    // disallow negated conditions
    'no-negated-condition': 'off',

    // disallow nested ternary expressions
    'no-nested-ternary': 'error',

    // disallow use of the Object constructor
    'no-new-object': 'error',

    // disallow use of unary operators, ++ and --
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // disallow specified syntax
    'no-restricted-syntax': ['error', 'LabeledStatement'],

    // disallow space between function identifier and application
    'no-spaced-func': 'off',

    // disallow tab characters entirely
    'no-tabs': 'error',

    // disallow the use of ternary operators
    'no-ternary': 'off',

    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',

    // disallow dangling underscores in identifiers
    'no-underscore-dangle': 'off',

    // disallow the use of Boolean literals in conditional expressions
    'no-unneeded-ternary': 'off',

    // disallow whitespace before properties
    'no-whitespace-before-property': 'error',

    // enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],

    // enforce line breaks between braces
    'object-curly-newline': 'off',

    // enforce "same line" or "multiple line" on object properties.
    'object-property-newline': ['error', {
      allowMultiplePropertiesPerLine: true,
    }],

    // allow just one var statement per function
    'one-var': ['error', 'never'],

    // require or disallow an newline around variable declarations
    'one-var-declaration-per-line': ['error', 'always'],

    // require assignment operator shorthand where possible or prohibit it entirely
    'operator-assignment': ['error', 'always'],

    // enforce operators to be placed before or after line breaks
    'operator-linebreak': 'off',

    // enforce padding within blocks
    'padded-blocks': ['error', 'never'],

    // require quotes around object literal property names
    'quote-props': 'off',

    // specify whether double or single quotes should be used
    'quotes': ['error', 'single'],

    // Require JSDoc comments
    'require-jsdoc': 'off',

    // require or disallow use of semicolons instead of ASI
    'semi': ['error', 'always'],

    // enforce spacing before and after semicolons
    'semi-spacing': ['error', { 'before': false, 'after': true }],

    // enforce sorting import declarations within module
    'sort-imports': 'off',

    // requires object keys to be sorted
    'sort-keys': 'off',

    // sort variables within the same declaration block
    'sort-vars': 'off',

    // require or disallow space before blocks
    'space-before-blocks': ['error', 'always'],

    // require or disallow space before function opening parenthesis
    'space-before-function-paren': ['error', 'always'],

    // require or disallow spaces inside parentheses
    'space-in-parens': ['error', 'never'],

    // require spaces around operators
    'space-infix-ops': 'error',

    // Require or disallow spaces before/after unary operators
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': true,
      'overrides': {
        '+': false,
        '-': false,
      },
    }],

    // require or disallow a space immediately following the // or /* in a comment
    'spaced-comment': 'off',

    // require or disallow the Unicode Byte Order Mark
    'unicode-bom': ['error', 'never'],

    // require regex literals to be wrapped in parentheses
    'wrap-regex': 'off',
  },
};
