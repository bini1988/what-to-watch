const path = require(`path`);

module.exports = {
  entry: {
    index: `./src/index.js`,
  },
  output: {
    filename: `bundle.js`,
    chunkFilename: `[name].bundle.js`,
    path: path.join(__dirname, `public`),
    publicPath: `/`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    historyApiFallback: true,
    compress: false,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
  resolve: {
    extensions: [`.js`, `.jsx`],
  },
};
