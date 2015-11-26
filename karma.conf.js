module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: process.env.CONTINUOUS_INTEGRATION,
    frameworks: [ 'mocha' ],
    browserNoActivityTimeout: 60000,// default 10000
    files: [
      'test/**/*_spec.js'
    ],
    preprocessors: {
      'test/**/*_spec.js': ['webpack']
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: process.env.CONTINUOUS_INTEGRATION
    },
    reporters: ['spec']
  });
};