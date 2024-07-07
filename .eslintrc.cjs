module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Add this line
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-explicit-any': 'error', // Throw error if `any` is used
    'react/react-in-jsx-scope': 'off', // Disable the rule that requires React to be in scope for JSX (if using new JSX transform)
    'react/jsx-uses-react': 'off', // Disable the rule that flags unused React (if using new JSX transform)
    'react/jsx-uses-vars': 'error', // Throw error if variables used in JSX are not defined
    'react/prop-types': 'off', // Disable prop-types as we are using TypeScript for type checking
    'prettier/prettier': 'error', // Add this line to enforce Prettier formatting as an ESLint error
  },
};
