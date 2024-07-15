module.exports = {
  plugins: ["stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-recess-order",
  ],
  customSyntax: "postcss-less",
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind"] }],
  },
};
