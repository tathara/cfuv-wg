module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    es6: true,
  },
  rules: {
    camelcase: ['error', { allow: ['geo_lat', 'geo_lon'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    semi: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single'],
    'newline-after-var': ['error'],
    'newline-before-return': ['error'],
    'no-unused-expressions': 'error',
    'no-console': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'padded-blocks': ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
