module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': [ 'off', { functions: false, classes: false } ],
    'max-classes-per-file': [ 'off', 1 ],
    'class-methods-use-this': [ 'off' ],
    'linebreak-style': [ 'off' ],
    'array-bracket-spacing': [ 'off' ],
    'space-in-parens:': [ 'off' ],
    'max-len': [ 'off' ],
    'computed-property-spacing': [ 'off' ]
  },
};
