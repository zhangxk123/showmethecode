// webpack5 配置指南 https://www.webpackjs.com/configuration/
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  // 核心配置：模式
  mode: "production",
  // 核心配置：入口
  entry: {
    main: "./src/index.js",
  },
  // 核心配置：出口
  output: {
    filename: "js/[name].[contenthash].js", // 用于多个入口点
    path: path.resolve(__dirname, "dist"), // 必须是绝对路径
    publicPath: "", // html文件里js文件的路径，可以是绝对路径或者相对路径
    // library: "MyLibrary", // 入口文件输出的
    // libraryTarget: "umd", // umd 规范
    // chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)「附加分块(additional chunk)」的文件名模板
  },
  // 核心配置：loader
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/, // css里的图片url处理
        include: /src/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片转为base64
              name: "imgs/[name].[hash].[ext]",
              // fallback: {
              // }
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash].[ext]",
          },
        },
      },
      // {
      //   test: /\.htm?l$/, // 打包后的html里可img正常显示
      //   use: 'html-withimg-loader'
      // },
    ],
    // 不解析
    noParse: [/special-library\.js$/],
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: ["js", "json", "jsx", "ts", "tsx", "css"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 为解析的请求启用缓存
    // 这是不安全，因为文件夹结构可能会改动
    // 但是性能改善是很大的
    // 将不经常变动的目录解析启用缓存
    unsafeCache: /src\/utils/,
  },
  performance: {
    hints: "warning", // 生产环境警告，开发环境配置error
    maxAssetSize: 200000, // 整数类型（以字节为单位） 打包后的文件不得超过200k
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）≈400k 入口文件不得超过400k
    assetFilter(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    },
  },
  // devtool: "inline-source-map",
  externals: {
    react: {
      // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000",
    },
    contentBase: path.join(__dirname, "public"), // boolean | string | array, static file location
    host: "0.0.0.0", // 这样服务可以被外部访问，默认localhost
    port: "8080",
    https: false, // true for self-signed, object for cert authority
    compress: true, // gzip
    historyApiFallback: true, // 404
    hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
    open: true,
    clientLogLevel: "none",
  },
  // 核心模块：插件
  plugins: [
    // 构建优化插件
    new HtmlWebpackPlugin({
      publicPath: "",
      inject: true, // 引入到body里
      minify: "auto", // 生产模式压缩
      template: "./src/template.html",
      // hash: true,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // server|json
      analyzerHost: "127.0.0.1",
      analyzerPort: "8888",
      openAnalyzer: true// 打开网址
    }),
    // new DashboardPlugin()
  ],
};