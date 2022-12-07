module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off'
  },
};
