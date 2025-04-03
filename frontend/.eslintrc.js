const { rules } = require("@typescript-eslint/eslint-plugin")

module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
    mocha: true,
    es6: true
  },
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-implicit-any": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never"
      }
    ]
  }
}
