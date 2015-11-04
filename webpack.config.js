var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: __dirname + '/built/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};
