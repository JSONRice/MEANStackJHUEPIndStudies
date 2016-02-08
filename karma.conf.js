module.exports = function (config) {
    config.set({
        basePath: './',

        // frameworks to use
        // availabe frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        
        // list of files/patterns to load into the test browser
        files: [
            'public/vendor/jquery/jquery.js',
            'public/vendor/angular/angular.js',
            'public/vendor/angular-sanitize/angular-sanitize.js',
            'public/vendor/angular-resource/angular-resource.js',
            'public/vendor/angular-ui-router/angular-ui-router.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'public/javascript/app.js',
            'public/javascript/**/*.js',
            'app/components/**/*.js',
            'app/view*/**/*.js',
            'tests/frontend/*.js',
            'tests/frontend/**/*Spec.js'
        ],
                                
        plugins: [
            'karma',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        
        /*
        junitReporter: {
            outputFile: 'coverage/unit.xml',
            suite: 'unit'
        },
        */
       
        // list of files to exclude
        exclude: [
        ],       
       
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/javascript/**/*.js': 'coverage'
        },       

        // configure the coverage checker
        coverageReporter: {
            includeAllSources: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        
        // web server port
        port: 9876,

        // enable/disable colors in the output (reporters and logs)
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable/disable watching file and executing tests whenever any file changes
        autoWatch: false,        
        
        browsers: ['PhantomJS'],
        
        // Continuous integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // disable if running a CI server such as Jenkins
        singleRun: true
    });
};
