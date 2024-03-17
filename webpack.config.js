const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const Visualizer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const showVisualizer = false

module.exports = env => {
  console.info(`webpack env: ${env.prod ? "production" : "development"}`)

  return {

    mode: env.prod ? "production" : "development",
    context: path.join(__dirname, "./"),
    entry: {
      app: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/",
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx",],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            "file-loader?name=images/[name].[ext]",
            "image-webpack-loader",
          ],
        },
        {
          test: /\.s?[ac]ss$/i,
          use: [
            env.prod ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/i,
          loader: "file-loader?name=fonts/[name].[ext]",
        },
      ],
    },
    devtool: "source-map",
    plugins: [
      new CleanWebpackPlugin(["dist", "build", "public",], { verbose: true, }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      showVisualizer && new Visualizer(),
    ].filter(_=>_),
  }
}
