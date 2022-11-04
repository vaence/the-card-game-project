/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./main.js",
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool:
    process.env.NODE_ENV === "production" ? "hidden-source-map" : "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "gamescreen.html",
      template: path.resolve(__dirname, "src/gamescreen.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
  ],
};
