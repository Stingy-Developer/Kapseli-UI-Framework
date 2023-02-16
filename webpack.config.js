const path = require("path");
var webpack = require("webpack");
var PACKAGE = require("./package.json");
var banner = `${PACKAGE.name} v${PACKAGE.version} (${PACKAGE.homepage})
Copyright 2021-${new Date().getFullYear()} The Kapseli Authors (https://github.com/Stingy-Developer/Kapseli-UI-Framework/graphs/contributors)
Licensed under ${
  PACKAGE.license
} (https://github.com/Stingy-Developer/Kapseli-UI-Framework/blob/main/LICENSE)`;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    filename: "bundle.js",
    libraryTarget: "umd",
    library: "kapseli",
  },
  module: {
    rules: [
      {
        test: /\.js$/, //using regex to tell babel exactly what files to transcompile
        exclude: /node_modules/, // files to be ignored
        use: {
          loader: "babel-loader", // specify the loader
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  watch: true,
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new TypescriptDeclarationPlugin({
      out: "@types/bundle.d.ts",
      removeComments: false,
      removeMergedDeclarations: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
