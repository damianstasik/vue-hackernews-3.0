module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state'],
    }],
  },
};
