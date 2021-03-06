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
    webpack: process.env.CONTINUOUS_INTEGRATION ? require('./webpack.test.config') : require('./webpack.config'),
    webpackMiddleware: {
      noInfo: process.env.CONTINUOUS_INTEGRATION
    },
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        { type: 'lcov', subdir: 'lcov-report' },
        { type: 'lcovonly', subdir: '..', file: 'client-lcov.info'}
      ]
    }

  });
};