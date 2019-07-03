const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    override: ".\\src\\override\\override.js",
    background: ".\\src\\bg\\background.js",
    browser_action: ".\\src\\browser_action\\browser_action.js"
  },
  stats: {
    errors: true,
    errorDetails: true,
    colors: true,
    modules: false,
    children: true,
    chunks: false,
    chunkModules: false
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["override"],
      filename: ".\\override.html",
      template: path.resolve(__dirname, "src\\override\\override.html")
    }),
    new HtmlWebpackPlugin({
      chunks: ["browser_action"],
      filename: "./browser_action.html",
      template: path.resolve(
        __dirname,
        "src\\browser_action\\browser_action.html"
      )
    }),
    new CopyPlugin([
      { from: ".\\manifest.json", to: "./" },
      { from: ".\\icons\\*", to: "./" },
      {
        from: path.resolve(__dirname, "src\\override\\override_manifest.json"),
        to: "./"
      }
    ])
  ]
};
