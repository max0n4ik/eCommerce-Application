export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,

    'declaration-block-single-line-max-declarations': null,

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen'],
      },
    ],
  },
};
