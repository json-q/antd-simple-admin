import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: [
    "dist",
    "node_modules",
    "*.woff",
    ".ttf",
    ".vscode",
    ".idea",
    ".husky",
    ".local",
    "/bin",
    ".eslintcache",
    ".stylelintcache",
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "prettier/prettier": "warn",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",

    "react-refresh/only-export-components": "off",
    "@typescript-eslint/no-explicit-any": "off", // allow any type
    "react-hooks/exhaustive-deps": "off", // colse effect deps lint
  },
});
