// webpack.config.js
// const webpack = require("webpack");

// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { env } = require("process");

module.exports = {
  mode: process.env.NODE_ENV, //read the priocess variables
  entry: {
    index:
      "./client/index.js",
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    //publicPath: '/' //used for base path for other assets
  },


  // plugins: [
  //   new HtmlWebPackPlugin({
  //     filename: "./index.html",
  //   }),
  // ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template:
  //       "client/index.html",
  //   }),
   
  // ],

  devServer: {
    static: {
      //publicPath: "/build/bundle/js"
      directory: path.join(__dirname, "public"), //gives an absolute path of the resource that is going to serve
    },
    compress: true,
    open: true,
    hot: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000/",
    },
  },

  // Other webpack configuration settings
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react", "@babel/env"],
          },
        },
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          "sass-loader"
        ],
      },
    ],
  },
};