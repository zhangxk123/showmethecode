module.exports = {
  env: {
    browser: true,
    // "es2021": true,
    node: true,
  },
  extends: ["airbnb-base"],
  // 解析器
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module", // default script
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    indent: ["error", 2],
    "no-underscore-dangle": [0],
    eqeqeq: [0],
    "quote-props": [0],
    quotes: [0],
    "no-console": [0],
    "func-names": [0],
    "no-extend-native": [0],
    "no-param-reassign": [0],
    "no-unused-vars": [0],
    "no-plusplus": [0],
    "import/extensions": [0],
    "no-alert": [0],
    "comma-dangle": [0],
    "eol-last": [0],
    "linebreak-style": [0],
    "no-use-before-define": [0],
  },
};
