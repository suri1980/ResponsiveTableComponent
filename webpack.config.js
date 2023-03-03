
const webpack = require("webpack");
const path = require("path");
const PACKAGE = require("./package.json");
const HtmlWPPlugin = require("html-webpack-plugin");
const CopyWPPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "appBuild.js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
        {
            test: /.(js)$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: { 
                presets: ['@babel/env','@babel/preset-react'] 
            },
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.EnvironmentPlugin({
      VERSION: PACKAGE.version,
    }),

    // Take Reference of HTML File.
    new HtmlWPPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
      APP_ROOT_ID: 'responsivetablecomponent',
      APP_VERSION: PACKAGE.version
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    static: {
      directory: "./public",
    },
    hot: true,
    port: 4000,
    proxy: {
      "/api": "http://YOUR_API_URL:9000",
    },
  },
};    