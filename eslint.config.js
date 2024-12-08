import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: globals.nodeBuiltin },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-var": ["error"],
      "prefer-const": ["error"],
      camelcase: ["warn"],
      "no-console": ["warn"],
      "no-unused-vars": ["warn"],
      semi: ["error", "always"],
      quotes: "off",
      indent: "off",
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
    },
  },
  {
    files: ["src/testFile.js", "src/testFileTemplate.js"],
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
    },
  },
];
