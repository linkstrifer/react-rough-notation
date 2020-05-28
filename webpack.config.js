var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/components/RoughNotation.tsx",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve("lib"),
    filename: "RoughNotation.js",
    libraryTarget: "commonjs2",
  },
};
