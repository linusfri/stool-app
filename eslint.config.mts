import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['babel.config.js', 'metro.config.js', 'tailwind.config.js', '*.json', 'lib/store/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'func-style': ['error', 'declaration'],
      
    },
  },
]);
