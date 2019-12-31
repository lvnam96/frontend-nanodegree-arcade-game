module.exports = {
  parser: 'babel-eslint', // parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  settings: {
    // "import/parsers": {
    //   "@typescript-eslint/parser": [".ts", ".tsx"]
    // },
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
    },
  },
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   project: './tsconfig.json',
  // },
  env: {
    es6: true,
    serviceworker: true,
    jasmine: true,
    jest: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    // 'prettier',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'prettier/@typescript-eslint',
  ],
  plugins: [
    'prettier',
    'promise',
    'babel',
    'react',
    'react-hooks',
    // '@typescript-eslint'
  ],
  globals: {
    appCtrller: true,
  },
  rules: {
    'promise/always-return': 'warn',
    'promise/catch-or-return': 'warn',
    'no-undef': 'error',
    semi: ['error', 'always'],
    indent: [
      'error',
      2,
      {
        VariableDeclarator: {
          var: 2,
          let: 2,
          const: 3,
        },
      },
    ],
    'comma-dangle': 'off',
    'space-before-function-paren': ['warn', 'always'],
    'babel/camelcase': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/unbound-method': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
  },
  overrides: [
    // {
    //   // enable the rule specifically for TypeScript files
    //   files: ['*.ts', '*.tsx'],
    //   rules: {
    //     '@typescript-eslint/explicit-function-return-type': [
    //       'error',
    //       {
    //         allowExpressions: true,
    //       },
    //     ],
    //     '@typescript-eslint/unbound-method': 'error',
    //   },
    // },
    // {
    //   "files": ["webpack.config.*.js"],
    //   "rules": {
    //     "node/no-unpublished-require": "off"
    //   }
    // }
  ],
};
