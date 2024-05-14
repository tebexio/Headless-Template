module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": "error",
    "vue/valid-v-slot": "off",
  },
};
