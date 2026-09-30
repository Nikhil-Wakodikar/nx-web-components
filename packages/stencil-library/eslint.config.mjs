import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
  ],
  plugins: ['@typescript-eslint', '@stencil'],
  rules: {
    // Your custom rules
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'max-len': ['error', { code: 80 }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'eqeqeq': ['error', 'always'],
    'eol-last': ['error', 'always'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});
