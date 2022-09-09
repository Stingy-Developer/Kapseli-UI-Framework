const path = require("path");

var webpack = require("webpack");
var PACKAGE = require("./package.json");
var banner = `${PACKAGE.name} v${PACKAGE.version} (${PACKAGE.homepage})
Copyright 2021-${new Date().getFullYear()} The Kapseli Authors (https://github.com/Stingy-Developer/Kapseli-UI-Framework/graphs/contributors)
Licensed under ${
  PACKAGE.license
} (https://github.com/Stingy-Developer/Kapseli-UI-Framework/blob/main/LICENSE)`;

const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    filename: "bundle.js",
    // library: {
    //   name: "Kapseli",
    //   type: "var",
    //   export: "default",
    // },
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
  plugins: [
    new webpack.BannerPlugin(banner),
    new TypescriptDeclarationPlugin({
      out: "@types/bundle.d.ts",
      removeComments: false,
      removeMergedDeclarations: false,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
