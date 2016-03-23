////
// Karma configuration
// Generated on Mon Feb 08 2016 20:19:32 GMT-0500 (EST)
//
// Note: see karma-* in package.json for a list of plugins
// or visit https://npmjs.org/browse/keyword/karma
////
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'browserify',
      'jasmine'
    ],
    // list of files / patterns to load in the browser
    files: [
      './client/vendor/jquery/jquery.js',
      './client/vendor/angular/angular.js',
      './client/vendor/angular-sanitize/angular-sanitize.js',
      './client/vendor/angular-resource/angular-resource.js',
      './client/vendor/angular-ui-router/angular-ui-router.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      './client/javascript/app.js',
      './client/javascript/**/*.js',
      'app/components/**/*.js',
      'app/view*/**/*.js',
      'tests/frontend/*Spec.js',
      'tests/frontend/**/*Spec.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './client/javascript/**/*.js': 'coverage',
      // browserify framework allows requires in the specs
      'tests/frontend/**/*Spec.js': 'browserify'

    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    // Note: recommend disabling as this triggers an exception.
    // See: https://github.com/nikku/karma-browserify/issues/75
    autoWatch: false,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    concurrency: Infinity
  });
};
