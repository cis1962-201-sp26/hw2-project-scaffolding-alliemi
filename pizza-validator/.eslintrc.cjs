module.exports = {
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  extends: ['eslint:recommended'],
  rules: {
    eqeqeq: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-lonely-if': 'error'
  },
  overrides: [
    {
      files: ['test/**/*.ts'],
      globals: { test: 'readonly', expect: 'readonly' }
    }
  ]
};
