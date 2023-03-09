module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  ignorePatterns: ["*.js"],
};
