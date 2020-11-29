module.exports = {
  // presets 生效顺序是倒序的
  presets: [
    [
      "@babel/preset-env",
      {
        // 如果没有配置，会使用browserslist配置
        targets: {
          "chrome": "58",
          "ie": "9",
          // "esmodules": true 目标为支持es6模块的浏览器环境
          // "node": true // 目标代码为当前node最新版本的标准
        },
        useBuiltIns: "usage", // 按需自动引入corejs@3的polyfill,entry是全局引入
        // 需安装生产依赖core-js@3和regenerator-runtime
        corejs: "3", // 当使用usage参数时，必须指定corejs版本，默认corejs@2，所以这里配置3，生产依赖需要安装core-js@3
      }]
  ],
  // plugins 生效顺序是正序的
  plugins: [
    // 打包后的代码，辅助函数统一从@babel/runtime里引入，可减少重复代码，但是默认只处理帮助函数
    // 需要安装生产依赖@babel/runtime
    ["@babel/plugin-transform-runtime", {
      // 这样配置可以处理polyfill，避免polyfill全局污染，但是没有target配置，所以polyfill代码会全部引入
      // 需安装生产依赖@babel/runtime-corejs3
      // "corejs": 3
    }]
  ]
};