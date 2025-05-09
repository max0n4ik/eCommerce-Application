export default {
  ignoreFiles: ['dist/**/*.css'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-clean-order',
    'stylelint-config-tailwindcss',
  ],
  rules: {
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'declaration-block-single-line-max-declarations': null,
    'at-rule-no-deprecated': null,
  },
};
