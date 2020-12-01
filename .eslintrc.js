module.exports = {
  // lint环境
  env: {
    es6: true,
    node: true,
  },
  // 扩展规则
  extends: ["airbnb-base"],
  // 解析器
  parser: "@babel/eslint-parser", // 配合babel使用
  parserOptions: {
    ecmaVersion: 12, // 支持es12版本语法
    sourceType: "module", // default script
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  // 自定义规则 0关闭，1警告，2错误
  rules: {
    indent: ["error", 2],
    "no-undef": [0],
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
